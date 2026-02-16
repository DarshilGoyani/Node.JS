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
    forgotPassword,
    // Category routes
    addCategoryPage,
    addCategory,
    viewCategory,
    editCategory,
    updateCategory,
    deleteCategory,
    // Sub Category routes
    addSubCategoryPage,
    addSubCategory,
    viewSubCategory,
    editSubCategory,
    updateSubCategory,
    deleteSubCategory,
    // Extra Category routes
    addExtraCategoryPage,
    addExtraCategory,
    viewExtraCategory,
    editExtraCategory,
    updateExtraCategory,
    deleteExtraCategory
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
router.post('/addAdmin', checkAuthIsDone, upload.single('profile'), addAdmin);

router.get('/editAdmin/:id', checkAuthIsDone, editAdmin);
router.post('/updateAdmin/:id', checkAuthIsDone, upload.single('profile'), updateAdmin);

router.get('/deleteAdmin/:id', checkAuthIsDone, deleteAdmin);

router.get('/profile', checkAuthIsDone, profile);

router.get('/change-password', checkAuthIsDone, changePasswordPage);
router.post('/change-password', checkAuthIsDone, changePassword);

router.get('/logout', checkAuthIsDone, logout);

// Category Routes
router.get('/addCategory', checkAuthIsDone, addCategoryPage);
router.post('/addCategory', checkAuthIsDone, upload.single('image'), addCategory);
router.get('/viewCategory', checkAuthIsDone, viewCategory);
router.get('/editCategory', checkAuthIsDone, editCategory);
router.post('/updateCategory', checkAuthIsDone, upload.single('image'), updateCategory);
router.get('/deleteCategory/:id', checkAuthIsDone, deleteCategory);

// Sub Category Routes
router.get('/addSubCategory', checkAuthIsDone, addSubCategoryPage);
router.post('/addSubCategory', checkAuthIsDone, upload.single('image'), addSubCategory);
router.get('/viewSubCategory', checkAuthIsDone, viewSubCategory);
router.get('/editSubCategory', checkAuthIsDone, editSubCategory);
router.post('/updateSubCategory', checkAuthIsDone, upload.single('image'), updateSubCategory);
router.get('/deleteSubCategory/:id', checkAuthIsDone, deleteSubCategory);

// Extra Category Routes
router.get('/addExtraCategory', checkAuthIsDone, addExtraCategoryPage);
router.post('/addExtraCategory', checkAuthIsDone, upload.single('image'), addExtraCategory);
router.get('/viewExtraCategory', checkAuthIsDone, viewExtraCategory);
router.get('/editExtraCategory', checkAuthIsDone, editExtraCategory);
router.post('/updateExtraCategory', checkAuthIsDone, upload.single('image'), updateExtraCategory);
router.get('/deleteExtraCategory/:id', checkAuthIsDone, deleteExtraCategory);

module.exports = router;
