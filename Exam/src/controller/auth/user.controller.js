const jwt = require('jsonwebtoken');
const statusCode = require('http-status-codes');
const moment = require("moment")
const bcrypt = require("bcrypt")
const { MSG } = require("../../utils/msg")
const { successResponce, errorResponce } = require("../../utils/responce");
const UserAuth = require('../../services/auth/user.services');

const userAuth = new UserAuth()

module.exports.registerUser = async (req, res) => {
    try{
        const fetchUser = await userAuth.fetchSingleUser({email : req.body.email});
        if (fetchUser) {
            return res.status(statusCode.CONFLICT).json(errorResponce(statusCode.CONFLICT, true, MSG.USER_ALREADY_EXISTS))
        }

        req.body.password = await bcrypt.hash(req.body.password, 11);

        req.body.create_at=  moment().format('DD/MM/YYYY, h:mm:ss A')
        req.body.updated_date=  moment().format('DD/MM/YYYY, h:mm:ss A')
        const User = await  userAuth.registerUser(req.body)
        
        if (!User) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponce(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
        }

        return res.status(statusCode.OK).json(successResponce(statusCode.OK, false, MSG.USER_CREATED, User))
    }
    catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponce(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}

module.exports.loginUser = async (req, res) => {
    try{
        console.log(req.body);

        const user = await userAuth.fetchSingleUser({ email: req.body.email});

        console.log(user);

        if (!user) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.ADMIN_NOT_FOUND));
        }

        const isPassword = await bcrypt.compare(req.body.password, user.password);

        if (!isPassword) {
            return res.status(statusCode.BAD_REQUEST).json(errorResponse(statusCode.BAD_REQUEST, true, MSG.ADMIN_LOGIN_FAILED));
        }

        // JWT Token
        const payload = {
            id: admin.id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

        console.log(token);

        return res.status(statusCode.OK).json(successResponce(statusCode.OK, false, MSG.LOGIN_SUCCESS, token))
    }
    catch(err){
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(errorResponce(statusCode.INTERNAL_SERVER_ERROR, true, MSG.SOMETHING_WENT_WRONG))
    }
}