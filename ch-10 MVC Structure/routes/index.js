const express = require("express")

const {homePage, aboutPage, employeePage, empForm} = require("../controllers/homePage.controllers")

const router = express.Router();

router.get("/", homePage)
router.get("/about", aboutPage)
router.get("/employee", employeePage)
router.get("/empForm", empForm)

module.exports = router;