const express = require("express");
const { homepage, formPage, tablePage, insertAdmin ,upload, deleteAdmin, updateAdminPage, updateAdmin} = require("../controller/emp.controller");


const router = express.Router();

router.get("/",homepage)
router.get("/formPage",formPage)
router.get("/tablePage",tablePage)
router.post("/insertAdmin",upload.single("profile_image"), insertAdmin)
router.get("/deleteAdmin/:id", deleteAdmin)
router.get("/updateAdmin/:id",updateAdminPage)
router.post("/editAdmin",upload.single("profile_image") ,updateAdmin)

module.exports = router;
