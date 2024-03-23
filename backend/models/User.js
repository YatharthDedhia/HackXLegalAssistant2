const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // lastname: {
    //     type: String,
    //     required: true
    // },
    // startyr: {
    //     type: Number,
    //     required: true
    // },
    city: {
        type: String
    },
    // court_type:{
    //     type: String,
    // },
    // mobile_no:{
    //     type:String
    // },

    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    type: {
        type: String,
        default: "General"
    },

    // gender: {
    //     type: String,
    // },
    // dob: {
    //     type: Date,
    //     default: Date.now,
    // },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

// Generate Barcode based on Name and ID

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding reset password into userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

// userSchema.methods

module.exports = mongoose.model('User', userSchema)