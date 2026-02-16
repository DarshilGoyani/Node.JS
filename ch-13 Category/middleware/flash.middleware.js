const setFlash = (req, res, next) => {
    res.locals.flash = {
        success: req.flash('success')[0] || '',
        error: req.flash('error')[0] || '',
        info: req.flash('info')[0] || ''
    };
    next();
};

module.exports = { setFlash };
