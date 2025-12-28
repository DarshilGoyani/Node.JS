const mongoose = require("mongoose");




const empSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
    },
    phone : {
        type : Number,
        require : true,
    },
    salary : {
        type : Number,
        require : true,
    },
    gender : {
        type : String,
        require : true,
    },
    role : {
        type : String,
        require : true,
    },
}) 


module.exports = module.model("Employee", empSchema, "Employee")