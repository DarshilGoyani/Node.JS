const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    first_name : {
        type : String,
        require : true
    },
    last_name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    phone : {
        type : String,
        require : true
    },
    OTP: { 
        type: Number, 
        default: null 
    },

    OTP_Expire: { 
        type: Date, 
        default: null 
    },
    attempt: { 
        type: Number, 
        default: 0 
    },
    attempt_expire: { 
        type: Date, 
        default: null 
    },
    verify_attempt: { 
        type: Number, 
        default: 0 
    },
    verify_attempt_expire: { 
        type: Date, 
        default: null 
    },
    isActive : {
        type : Boolean,
        default : true
    },
    isDelete : {
        type : Boolean,
        default : false
    },
    created_at : {
        type : String,
        default : true
    },
    updated_at : {
        type : String,
        default : true
    },
});

module.exports = mongoose.model("Admin", adminSchema, "Admin")