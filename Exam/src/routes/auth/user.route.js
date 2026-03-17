const express = require("express")
const { registerUser, loginUser } = require("../../controller/auth/user.controller")

const userRoute = express.Router()

userRoute.use("/register", registerUser)
userRoute.use("/login", loginUser)

module.exports = userRoute
