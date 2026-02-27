const express = require('express');
const { passport, checkAuthIsDone, checkAuthIsNotDone } = require('../middleware/passport.middleware');
const upload = require('../middleware/multer.middleware');

const {
    dashborad,
    viewadmin,
    addAdmin,
    addAdminPage,
    deleteAdmin,
    editAdmin,
    updateAdmin,
    loginPage,
    login,
    logout,
    changePasswordPage,
    changePassword,
    profile,
    verifyEmail,
    otpPage,
    VerifyOtp,
    forgotPasswordPage,
    forgotPassword
} = require('../controller/emp.controller');

const router = express.Router();

router.get('/', checkAuthIsNotDone, loginPage);

router.post(
    '/login',
    checkAuthIsNotDone,
    passport.authenticate('localAuth', { failureRedirect: '/' }),
    login
);

router.post('/verify-email', checkAuthIsNotDone, verifyEmail);

router.get('/Otp-Page', checkAuthIsNotDone, otpPage);
router.post('/VerifyOtp', checkAuthIsNotDone, VerifyOtp);

router.get('/forgot-password', checkAuthIsNotDone, forgotPasswordPage);
router.post('/forgot-password', checkAuthIsNotDone, forgotPassword);

router.get('/dashboard', checkAuthIsDone, dashborad);

router.get('/viewAdmin', checkAuthIsDone, viewadmin);
router.get('/addAdmin', checkAuthIsDone, addAdminPage);
router.post('/addAdmin', checkAuthIsDone, upload.single('profile_image'), addAdmin);

router.get('/editAdmin/:id', checkAuthIsDone, editAdmin);
router.post('/updateAdmin/:id', checkAuthIsDone, upload.single('profile_image'), updateAdmin);

router.get('/deleteAdmin/:id', checkAuthIsDone, deleteAdmin);

router.get('/profile', checkAuthIsDone, profile);

router.get('/change-password-auth', checkAuthIsDone, changePasswordPage);
router.post('/change-password-auth', checkAuthIsDone, changePassword);

router.get('/logout', checkAuthIsDone, logout);

module.exports = router;
