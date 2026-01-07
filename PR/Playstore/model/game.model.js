const mongoose = require("mongoose")

const gameSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    category : {
        type : String,
        require : true,
    },
    sub_category : {
        type : String,
        require : true,
    },
    rating : {
        type : Number,
        require : true,
    },
    logo : {
        type : String,
        require : true,
    },
    image : {
        type : String,
        require : true,
    },
})

module.exports = mongoose.model("game", gameSchema, "Game");