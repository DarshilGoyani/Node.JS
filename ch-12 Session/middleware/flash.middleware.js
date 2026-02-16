const setFlash = (req, res, next) => {
    res.locals.flash = req.flash();
    next();
};

module.exports = {
    setFlash
};