const express = require("express")
const fs = require("fs")

const app = express();

let file = "";
    
app.get("/", (req, res) => {
    fs.readFile("index.html", (err, result) => {
        res.end(result);
    })
})

app.get("/gallary", (req, res) => {
    fs.readFile("gallary.html", (err, result) => {
        res.end(result);
    })
})

app.get("/contact", (req, res) => {
    fs.readFile("contact.html", (err, result) => {
        res.end(result);
    })
})

app.get("/blog", (req, res) => {
    fs.readFile("blog.html", (err, result) => {
        res.end(result);
    })
})
   

app.listen(8000, (err) => {
    if(err){
        console.log(err);
        
    }

    console.log("started");
    
})