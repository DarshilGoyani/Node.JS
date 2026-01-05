const express = require("express")
const fs = require("fs")
const Book = require("./model/book.model")
const multer = require("multer")
const path = require("path")
const PORT = 8000;

const app = express()

const db = require("./config/db.config");
const { fstat } = require("fs");

app.set("view engine","ejs")
app.use(express.urlencoded())
app.use("/uploads", express.static(path.join(__dirname,"uploads")))


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
    fs.unlink(deletedBook.img, (err) => { })
    return res.redirect("/")
})

// image add using multer
const storage = multer.diskStorage({
    destination : (req, file,cb) => {
        cb(null,"uploads/");
    },
    filename : (req,file,cb) => {
        cb(null, Date.now()+`-`+file.originalname);
    }
})

const upload = multer({storage})

app.post("/addBook", upload.fields([
    { name: "img", maxCount: 1 },
    { name: "authore_img", maxCount: 1 }
]), async (req, res) => {

    if (req.files.img) {
        req.body.img = req.files.img[0].path;
    }
    if (req.files.authore_img) {
        req.body.authore_img = req.files.authore_img[0].path;
    }

    await Book.create(req.body);
    res.redirect("/");
});


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

app.post("/updateBook", upload.any(), async (req, res) => {
    const bookData = await Book.findById(req.body.id);

    req.files.forEach(file => {
        if (file.fieldname === "img") {
            if (bookData.img) fs.unlink(bookData.img, () => {});
            req.body.img = file.path;
        }
        if (file.fieldname === "authore_img") {
            if (bookData.authore_img) fs.unlink(bookData.authore_img, () => {});
            req.body.authore_img = file.path;
        }
    });

    const updatedBook = await Book.findByIdAndUpdate(req.body.id, req.body, { new: true });
    console.log(updatedBook);
    return res.redirect("/");
});






app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is started ",err);
        return false
    }
    console.log("Server is Started");
    
})