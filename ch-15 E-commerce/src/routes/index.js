const express = require("express")

const route = express.Router()

route.use("/auth", require("./auth/auth.route"))
route.use("/admin", require("./auth/admin/admin.route"))
route.use("/category", require("./category/category.route"))

module.exports = route;