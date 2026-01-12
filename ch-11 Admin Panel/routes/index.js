const express = require("express");
const { homepage, formPage, tablePage, insertAdmin ,upload, deleteAdmin, updateAdminPage, updateAdmin, loginPage, checkAdmin, logOut, changePasswordPage, changePassword, viewProfilePage} = require("../controller/emp.controller");


const router = express.Router();

// login page
router.get("/",loginPage)
router.post("/loginAdmin",checkAdmin)

// log out
router.get("/logOut",logOut)

// dashboard page
router.get("/dashboard",homepage)

// form page
router.get("/formPage",formPage)

// table page
router.get("/tablePage",tablePage)

// add admin
router.post("/insertAdmin",upload.single("profile_image"), insertAdmin)

// delete admin
router.get("/deleteAdmin/:id", deleteAdmin)

// update admin
router.get("/updateAdmin", updateAdminPage)

// edit edmoin
router.post("/editAdmin",upload.single("profile_image") ,updateAdmin)

// change assword page
router.get("/changePasswordPage",changePasswordPage)
router.post("/forgotPassword",changePassword)

// view profile
router.get("/profile",viewProfilePage)

module.exports = router;
