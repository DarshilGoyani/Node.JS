const jwt = require("jsonwebtoken")
const { JsonWebTokenError } = require("jsonwebtoken");
const { MSG } = require("../utils/msg");
const AuthAdmin = require("../services/auth/admin/admin.service");
const { errorResponse } = require("../utils/response.utils");
const adminAuth = new AuthAdmin();

module.exports.authMiddlewarw = async (req,res,next) => {
    try{
        let token = req.headers.authorization;
        token = token.slice(7, token.length)
        if (!token) {
            return res.status(500).json(errorResponse(500,true,MSG.ADMIN_UNAUTHORIZED))
        }
        
        try{
            const decoded = jwt.verify(token, process.env.JWT_secret_key)
            
            console.log(decoded);
            let data;

            if (decoded.isAdmin) {
                data = await adminAuth.fetchSingleAdmin({ _id: decoded.id, isDelete: false, isActive: true }, true);

                req.admin = data;
            } else {
                data = await adminAuth.fetchSingleAdmin({ _id: decoded.id, isDelete: false, isActive: true }, true);
                req.user = data
            }

            const singleAdmin = await adminAuth.fetchSingleAdmin({_id : decoded.admin_id, isDelete: false, isActive: true})
            
            if (data) {
                next()
            }else{
                return res.status(500).json(errorResponse(500,true,MSG.ADMIN_UNAUTHORIZED))
            }
        }catch(err){
            console.log("error",err);
            return res.status(500).json(errorResponse(500,true,MSG.ADMIN_UNAUTHORIZED))
        }

    }
    catch(err){
        console.log("error ",err);
        
    }
}