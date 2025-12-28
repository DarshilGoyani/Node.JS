const express = require("express")

const {homePage, aboutPage, employeePage, empForm} = require("../controllers/homePage.controllers")

const router = express.Router();

router.get("/", homePage)
router.get("/about", aboutPage)
router.use("/employee" , require("./employee.routes")) 

module.exports = router;