const express = require("express")

const route = express.Router()

route.use("/auth", require("./auth/user.route"))
route.use("/task", require("./task/task.route"))

module.exports = route
