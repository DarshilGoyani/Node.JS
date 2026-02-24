const express = require("express")

const route = express.Router();

route.get("/admin", require("auth/admin.route.js"))

module.exports = route;