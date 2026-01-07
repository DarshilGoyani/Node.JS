const mongoose = require("mongoose")

const medicineSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    manufacturer : {
        type : String,
        require : true,
    },
    mfg_date : {
        type : String,
        require : true,
    },
    exp_date : {
        type : String,
        require : true,
    },
    status : {
        type : String,
        require : true,
    },
    quantity : {
        type : Number,
        require : true,
    },
    img : {
        type : String,
        require : true,
    }
})

const medicine = mongoose.model("medicine",medicineSchema,"medicines")
module.exports = medicine