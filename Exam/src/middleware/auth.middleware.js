const jwt = require('jsonwebtoken');
const status = require('http-status-codes');
const { errorResponse } = require('../utils/responce');
const { MSG } = require('../utils/msg');
const UserAuth = require('../services/auth/user.services');
const userAuthService = new UserAuth();

module.exports.authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(status.BAD_REQUEST).json(errorResponse(status.BAD_REQUEST, true, MSG.TOKEN_MISSING));
    }

    token = token.slice(7, token.length);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded.id) {
            return res.status(status.BAD_REQUEST).json(errorResponse(status.BAD_REQUEST, true, MSG.TOKEN_INVALID));
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(status.BAD_REQUEST).json(errorResponse(status.BAD_REQUEST, true, MSG.TOKEN_INVALID));
    }
};