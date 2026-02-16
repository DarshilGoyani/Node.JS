const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/admin.model');

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

passport.serializeUser((admin, done) => {
    return done(null, admin.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const admin = await Admin.findById(id);
        return done(null, admin);
    } catch (error) {
        return done(error);
    }
});


const checkAuthIsDone = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
};

const checkAuthIsNotDone = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/dashboard');
};

const currentAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user;
    }
    next();
};

module.exports = {
    passport,
    checkAuthIsDone,
    checkAuthIsNotDone,
    currentAdmin
};
