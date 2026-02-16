const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/admin.model');

// =====================
// Local Strategy
// =====================
passport.use(
    "localAuth",
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        async (email, password, done) => {
            try {
                const admin = await Admin.findOne({ email });

                if (!admin) {
                    console.log("Admin not found!!");
                    return done(null, false);
                }

                if (password !== admin.password) {
                    console.log("Password is invalid..");
                    return done(null, false);
                }

                return done(null, admin);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// =====================
// Serialize
// =====================
passport.serializeUser((admin, done) => {
    return done(null, admin.id);
});

// =====================
// Deserialize
// =====================
passport.deserializeUser(async (id, done) => {
    try {
        const admin = await Admin.findById(id);
        return done(null, admin);
    } catch (error) {
        return done(error);
    }
});

// =====================
// Custom Middlewares
// =====================

// If Logged In
const checkAuthIsDone = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};

// If NOT Logged In
const checkAuthIsNotDone = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/dashboard');
};

// Set Current Admin in locals
const currentAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user;
    }
    next();
};

// =====================
// Export Everything Properly
// =====================
module.exports = {
    passport,
    checkAuthIsDone,
    checkAuthIsNotDone,
    currentAdmin
};
