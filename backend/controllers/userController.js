const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/User');

const sendToken = require('../utils/jwttoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");
const bcrypt = require("bcrypt")


// Register user
const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password, type } = req.body;
    console.log(email)
    if (!password || !email || !type) {
        return next(new errorHandler("All fields required", 400))
    }

    const duplicate = await User.findOne({ email }).lean().exec()
    if (duplicate) {
        return next(new errorHandler("User already present", 409))
    }

    const HashedPwd = await bcrypt.hash(password, 10)

    const user = await User.create({
        email,
        "password": HashedPwd,
        type
    });
    console.log(user)

    sendToken(user, 201, res);
});

//Login User
const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler("Please Enter Email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new errorHandler("Invalid email", 401));
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
        return next(new errorHandler("Invalid Password", 401));
    }
    sendToken(user, 200, res);
})

//Logout User
const logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new errorHandler("User not found", 404));
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/ap1/v1/password/${resetToken}`;
    const message = `Your password rest token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password recovery email",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new errorHandler(error.message, 500));
    }
})

//Reset Password
const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
        return next(new errorHandler("Reset Password token is not valid or has been expired", 401));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new errorHandler("Password does not match", 401));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);

});

const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    })
})

const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new errorHandler("Old Password is Incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new errorHandler("Password does not match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})

const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        user
    })


    sendToken(user, 200, res);
});

const getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

const getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new errorHandler(`User does not exist with id :${req.params.id}`, 400));
    }
    res.status(200).json({
        success: true,
        user,
    })
})

//Update User Role
const updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        user
    })


    sendToken(user, 200, res);
});

//Delete User
const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new errorHandler(`User does not exist with id :${req.params.id}`, 400));
    }
    res.status(200).json({
        success: true,
        user
    })
    await user.remove();


    sendToken(user, 200, res);
});

const getUserInfo = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ "email": email });
    if (!user)
        return next(new errorHandler(`User does not exist`, 400));

    console.log(user._id);
    var acc = await Account.findOne({ "user": user._id })
    if (!acc)
        return next(new errorHandler(`Account does not exist`, 400));

    const leaves = acc.leaves

    function processDate(date) {
        var parts = date.split("/");
        return new Date(parts[2], parts[1] - 1, parts[0]);
    };

    var push_bool = true;
    if (acc.leaves.length == 0) {
        console.log("length 0")
        meals.forEach(async (meal) => {
            await Account.findOneAndUpdate(
                { "user": user._id },
                {
                    $push: { meals: meal }
                }
            );
        })
    }
    else {
        for (var i = 0; i < meals.length; i++) {
            push_bool = true;
            for (var j = 0; j < leaves.length; j++) {
                // leaves[j] for only 1 meal
                const cond1 = (leaves[j].startDate == leaves[j].endDate && meals[i].date == leaves[j].startDate && meals[i].mealType == leaves[j].mealType)

                // leaves[j] for a period of time
                const cond2 = (leaves[j].startDate != leaves[j].endDate && processDate(leaves[j].startDate) <= processDate(leaves[j].endDate) && processDate(meals[i].date) >= processDate(leaves[j].startDate) && processDate(meals[i].date) <= processDate(leaves[j].endDate))

                if (cond1 || cond2) {
                    push_bool = false
                }
            }
            if (push_bool) {
                await Account.findOneAndUpdate(
                    { "user": user._id },
                    {
                        $push: { meals: meals[i] }
                    }
                )
            }
        }
    }

    acc = await Account.findOne({ "user": user._id })
    res.status(201).json({ acc })
})


const getUserbyType = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new errorHandler(`User does not exist with id :${req.params.id}`, 400));
    }
    res.status(200).json({
        success: true,
        user,
    })
})

const getUserbyField = catchAsyncErrors(async (req, res, next) => {
    const {type } = req.body;
    console.log(type)
    // Using find method with a query object to search by type
    const users = await User.find({ type });
    console.log(users)
    if (!users || users.length === 0) {
        return next(new errorHandler(`Users not found with type: ${type}`, 404));
    }

    res.status(200).json({
        success: true,
        users,
    });
});

module.exports = {
    registerUser,
    loginUser,
    logOut,
    getUserbyType,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
    getUserInfo,
    getUserbyField
}