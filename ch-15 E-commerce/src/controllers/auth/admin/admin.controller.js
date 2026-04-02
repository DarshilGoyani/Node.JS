const moment = require("moment")
const bcrypt = require("bcrypt")
const status = require("http-status-code")
const jwt = require("jsonwebtoken")
const { successResponse, errorResponse } = require("../../../utils/response.utils");
const AuthAdmin = require("../../../services/auth/admin/admin.service");
const { MSG } = require("../../../utils/msg");
const Admin = require("../../../model/admin.model")
const { sendOTPMail } = require("../../../utils/mailer");


const adminAuth = new AuthAdmin();

module.exports.registerAdmin = async (req,res) => {
    try{

        // check if email exist
        const admin = await adminAuth.fetchSingleAdmin({email : req.body.email , isDelete : false})
        if (admin) {
            return res.status(400).json(errorResponse(400,true, MSG.ADMIN_ALREADY_EXIST ))
        }

        req.body.password = await bcrypt.hash(req.body.password, 11)

        req.body.created_at = moment().format('MMMM Do YYYY, h:mm:ss A');
        req.body.updated_at = moment().format('MMMM Do YYYY, h:mm:ss A');

        const newAdmin = await adminAuth.registerAdmin(req.body)

         if (!newAdmin) {
            return res.status(400).json(errorResponse(400, true, MSG.ADMIN_REGISTRATION_FAILED))
        }
        console.log("new admin ", newAdmin )
        return res.status(201).json(successResponse(201, false, MSG.ADMIN_REGISTRATION_SUCCESS, newAdmin))
        
    }catch(err){
        console.log("error := ",err);
        
    }
}

module.exports.loginAdmin = async (req,res) => {
    try{
        const admin = await adminAuth.fetchSingleAdmin({email : req.body.email , isDelete : false})
        if (!admin) {
            return res.status(400).json(errorResponse(400,true, MSG.ADMIN_NOT_FOUND))
        }

        //checking password
        const isPassword = await bcrypt.compare(req.body.password, admin.password)

        if (!isPassword) {
            return res.status(400).json(errorResponse(400,true, MSG.ADMIN_INVALID_PASSWORD))
        }

        let payload = {
            admin_id : admin.id
        }

        // generatin token using jwt
        const token = jwt.sign(payload, process.env.JWT_secret_key)
        console.log(token);
        
        
        
        return res.status(200).json(successResponse(200,false, MSG.ADMIN_LOGIN_SUCCESS, {token}))

    }catch(err){
        console.log("error := ",err);
        
    }
}

module.exports.fetchAllAdmins = async (req,res) => {
    try{
        
        const allAdmins = await Admin.find({ isDelete: false });

        if (!allAdmins) {
            return res.status(500).json(errorResponse(500,false,MSG.ADMIN_UNAUTHORIZED))
        }

        return res.status(200).json(successResponse(200,false, MSG.ALL_ADMIN_FETCHED_SUCCESSFULLY, {allAdmins}))
    }catch(err){
        console.log("error := ",err);
        return res.status(500).json(
        errorResponse(500, true, "Internal server error")
    );
}
}

module.exports.forgotPssword = async (req,res) => {
    try{
        const admin = await adminAuth.fetchSingleAdmin({email: req.body.email , isDelete : false})

        if (!admin) {
            return res.status(500).json(errorResponse(500,true,MSG.ADMIN_NOT_FOUND))
        }

        if (admin.attempt_expire < Date.now()) {
            admin.attempt = 0;
        }

        if (admin.attempt_expire < Date.now()) {
            await adminAuth.updateAdmin(admin.id, { attempt: 0 });
            admin.attempt = 0;
        }

        if (admin.attempt > 3) {
            return res.status(500).json(errorResponse(500,true,MSG.MANY_TIME_OTP))
        }

        const OTP = Math.floor(100000 + Math.random() * 900000)

        await sendOTPMail(req.body.email,OTP)

        admin.attempt++;

        const expireOTPTime = new Date(Date.now() + 1000 * 60 * 2)

        await adminAuth.updateAdmin(admin.id, { OTP: OTP, OTP_Expire: expireOTPTime, attempt: admin.attempt, attempt_expire: new Date(Date.now() + 1000 * 60 * 60) })

        return res.status(200).json(successResponse(200, false, MSG.OTP_SEND_SUCCESSFULLY))

    }catch(err){
        console.log("error ",err);
        
    }
}

module.exports.verifyOTP = async (req,res) => {
    try{
       
        
        if (!req.body) {
            return res.status(400).json(errorResponse(400, true, "Request body is missing"));
        }
        
        const admin = await adminAuth.fetchSingleAdmin({email : req.body.email , isDelete : false});
        if (!admin) {
            return res.status(404).json(errorResponse(404, true, MSG.ADMIN_NOT_FOUND))
        }
        
        if (admin.OTP_Expire < Date.now()) {
            return res.status(400).json(errorResponse(400, true, "OTP has expired"))
        }


        if (req.body.OTP != admin.OTP) {
            return res.status(400).json(errorResponse(400, true, "Invalid OTP"))    
        }

        admin.verify_attempt++;

        await Admin.findByIdAndUpdate(admin._id, {
            OTP: null,
            OTP_Expire: null,
            attempt: 0,
            attempt_expire: null
        });

        return res.status(200).json(successResponse(200, false, "OTP verified successfully", { email: admin.email }));


        
    }catch(err){
        console.log("error ",err);
        
    }
}

module.exports.changePassword = async (req,res) => {
    try{
        const admin = await adminAuth.fetchSingleAdmin({email : req.body.email, isDelete : false});
        if(!admin){
            return res.status(500).json(errorResponse(500,true,MSG.ADMIN_NOT_FOUND))
        }

        await adminAuth.updateAdmin(admin.id, {password: req.body.password})
        return res.status(200).json(successResponse(200, false, MSG.PASSWORD_CHANGE_SUCCESS))
    }catch(err){
        console.log("error ",err);7
    }
}

module.exports.deleteAdmin = async (req,res) => {
    try{
        console.log("req query", req.query);
        
        const admin = await adminAuth.fetchSingleAdmin( {_id : req.query.id, isDelete : false})
        console.log("admin ",admin);
        
        await adminAuth.updateAdmin(admin.id,{isDelete : true, isActive : false})

        return res.status(200).json(successResponse(200, false, MSG.ADMIN_DELETED_SUCCESSFULLY))
    }catch(err){
        console.log("error ",err);
    }
    
}

module.exports.activeOrInactiveAdmin = async (req,res) => {
    try{
       const admin = await adminAuth.fetchSingleAdmin({_id : req.query.id, isDelete : false})

       if (!admin) {
            return res.status(500).json(errorResponse(500, true, MSG.ADMIN_NOT_FOUND))
       }
       
       await adminAuth.updateAdmin(admin.id, {isActive : !admin.isActive})

        return res.status(200).json(successResponse(200, false, MSG.ADMIN_DELETED_SUCCESSFULLY))
    }catch(err){
        console.log("error ",err);
    }
}

module.exports.adminProfile = async (req,res) => {
    try{


        if (req.user) {
            return res.status(200).json(errorResponse(200, true, MSG.ADMIN_UNAUTHORIZED));
        }
        const admin = await adminAuth.fetchSingleAdmin({_id : req.query.id,isDelete : false})
        return res.status(200).json(successResponse(200, false, MSG.ADMIN_PROFILE_FETCHED, admin))
    }catch(err){
        console.log("error ",err);
    }
}