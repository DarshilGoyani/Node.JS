const multer = require('multer');
const { storage } = require('../../middleware/storage.middleware');
const upload = multer({ storage });

const express = require("express");
const { addCategory, fetchhAllCategory, updateCategory, deleteCategory } = require("../../controllers/category/category.controller");

const categoryRoute = express.Router()


categoryRoute.get("/", fetchhAllCategory)
categoryRoute.post("/", upload.single("category_image"), addCategory)
categoryRoute.put("/:id", upload.single("category_image"), updateCategory)
categoryRoute.delete("/:id", deleteCategory)

module.exports = categoryRoute;