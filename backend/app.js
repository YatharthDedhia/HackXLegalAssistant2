const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors())
app.use(express.json())
app.use(cookieParser());
// const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
// app.use("/api/v1", product);
app.use("/api/v1", user);
app.use(errorMiddleware);

//Middleware for error
module.exports = app