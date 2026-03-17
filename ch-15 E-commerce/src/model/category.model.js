const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    category_name : {
        type : String,
        require : true
    },
    category_image : {
        type : String
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

module.exports = mongoose.model("Category", categorySchema, "Category")