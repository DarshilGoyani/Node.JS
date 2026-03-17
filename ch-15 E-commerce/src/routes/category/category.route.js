const express = require("express");
const { addCategory, fetchhAllCategory } = require("../../controllers/category/category.controller");

const categoryRoute = express.Router()

categoryRoute.get("/", fetchhAllCategory)
categoryRoute.post("/", addCategory)

module.exports = categoryRoute;