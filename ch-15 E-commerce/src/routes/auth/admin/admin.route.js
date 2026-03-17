const express = require("express");

const { registerAdmin, loginAdmin, fetchAllAdmins, forgotPssword, verifyOTP, changePassword, deleteAdmin, activeOrInactiveAdmin, adminProfile,  } = require("../../../controllers/auth/admin/admin.controller");
const { authMiddlewarw } = require("../../../middleware/auth.middleware");


const adminRoute = express.Router();

adminRoute.post('/register', registerAdmin)
adminRoute.post('/login', loginAdmin)
adminRoute.post('/forgot_password', forgotPssword)
adminRoute.post('/verify_otp', verifyOTP)
adminRoute.post('/change_password', changePassword)


adminRoute.get('/',authMiddlewarw, fetchAllAdmins)
adminRoute.delete('/', authMiddlewarw, deleteAdmin )
adminRoute.patch("/", authMiddlewarw, activeOrInactiveAdmin)
adminRoute.get('/profile',authMiddlewarw, adminProfile)

module.exports = adminRoute;