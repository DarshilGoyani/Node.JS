const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    author : {
        type : String,
        require :true,
    },
    price : {
        type : Number,
        require : true,
    },
    language : {
        type : String,
        require : true,
    },
})

const Book = mongoose.model("Book",bookSchema,"Books")

module.exports = Book;