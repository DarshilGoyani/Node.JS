const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    fname : String,
    lname : String,
    email : String,
    password : String,
    phone : String,
    gender : String,
    hobby : Array,
    city : String,
    message : String,
    profile_image : String,
})


module.exports = mongoose.model("Admin", adminSchema, "Admin");