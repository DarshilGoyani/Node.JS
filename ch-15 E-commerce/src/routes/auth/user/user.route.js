const express = require("express");
const { register, registerUser, loginUser, forgotPssword } = require("../../../controllers/auth/user/user.controller");


const userRoute = express.Router();

userRoute.post('/register', registerUser)
userRoute.post('/login', loginUser)
userRoute.post('/forgot_password', forgotPssword)

module.exports = userRoute;