const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isActive : {
        type : Boolean,
        default : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    create_at : {
        type : String,
    },
    update_at : {
        type : String,
    }
});

module.exports = mongoose.model("User", userSchema, "User")
