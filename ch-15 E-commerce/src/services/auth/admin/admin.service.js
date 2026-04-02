const Admin = require("../../../model/admin.model");
const { MSG } = require("../../../utils/msg");
const { errorResponse, successResponse } = require("../../../utils/response.utils");




module.exports = class AuthAdmin{
    async registerAdmin(body){
        try{
            return await Admin.create(body);
        }catch(err){
            console.log("Admin Registration Error ", err);
            
        }
        
    }
   
    async fetchSingleAdmin(body){
        try{
            return await Admin.findOne(body)
        }catch(err){
            console.log("Admin Registration Error ", err);
            
        } 
    }

    async fetchAllAdmin(){
        try{
            return await Admin.find({ isDelete: false })
        }catch(err){
            console.log("fetch all admin error ", err);
            
        } 
    }

    async updateAdmin(id,body){
        try{
            return await Admin.findByIdAndUpdate(id, body, {new:true})
        }catch(err){
            console.log("update admin error ", err);
            
        } 
    }

    async deleteAdmin(id){
        try{
            return await Admin.findByIdAndUpdate(id, { isDelete: true }, { new: true })
        }catch(err){
            console.log("admin delete error ", err);
        } 
    }
}