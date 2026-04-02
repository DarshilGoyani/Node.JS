const User = require("../../../model/user.model");
const { MSG } = require("../../../utils/msg");
const { errorResponse, successResponse } = require("../../../utils/response.utils");




module.exports = class AuthUser{
    async registerUser(body){
        try{
            return await User.create(body);
        }catch(err){
            console.log("User Registration Error ", err);
            
        }
        
    }
   
    async fetchSingleUser(body){
        try{
            return await User.findOne(body)
        }catch(err){
            console.log("User Registration Error ", err);
            
        } 
    }

    async fetchAllUser(){
        try{
            return await User.find({ isDelete: false })
        }catch(err){
            console.log("fetch all User error ", err);
            
        } 
    }

    async updateUser(id,body){
        try{
            return await User.findByIdAndUpdate(id, body, {new:true})
        }catch(err){
            console.log("update User error ", err);
            
        } 
    }

    async deleteUser(id){
        try{
            return await User.findByIdAndUpdate(id, { isDelete: true }, { new: true })
        }catch(err){
            console.log("User delete error ", err);
        } 
    }
}