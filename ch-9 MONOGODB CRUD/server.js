const express = require("express")
const Book = require("./model/book.model")
const PORT = 8000;

const app = express()

const db = require("./config/db.config")

app.set("view engine","ejs")
app.use(express.urlencoded())




app.get("/",async (req,res) => {

    let allBooks = await Book.find()
    // console.log(allBooks);
    
    res.render("table",{allBooks})
})

app.get("/formPage",(req,res) => {
    console.log(req.query);
    
    res.render("form")
})

app.get("/deleteBook",async (req,res) => {
    const deletedBook = await Book.findByIdAndDelete(req.query.id)
    console.log(deletedBook);
    return res.redirect("/")
})

app.post("/addBook",async (req,res) => {
    console.log(req.body);

    Book.create(req.body).then(() => {
        console.log("Book inserted successfully");
        
    }).catch(err => {
        console.log("Book not added due to error ");
        console.log("err ", err);
    })


    res.redirect("/")
})

app.get("/editBook/:bookId", async (req,res) => {

    const book = await Book.findById(req.params.bookId)

    console.log("book := ",book);
    
    if (book) {
        return res.render("edit",{book})
    }
    else{
        return res.redirect("/")
    }
    
})

app.post("/updateBook", async (req,res) => {


    const updatedBook = await Book.findByIdAndUpdate(req.body.id,req.body,{new : true})
    console.log(updatedBook);
    

    return res.redirect("/");
})



app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is started ",err);
        return false
    }
    console.log("Server is Started");
    
})