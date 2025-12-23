const express = require("express")
const fs = require("fs")
const PORT = 8000;

const app = express()

app.set("view engine", "ejs")

// log middleware
app.use((req,res,next) => {
    fs.appendFile('./logFile.txt',`Date := ${Date.now()}, PATH := ${req.path}, IP := ${req.ip}<br>`,(err) => {
        next()
    })
})


app.get('/',(req,res) => {
    res.render("about")
})

app.get("/about",(req,res) => {
    res.render("about")
})

app.listen(PORT,(err) => {
    if (err) {
        console.log(`server is not started ${err}`);
        return false
    }
    console.log("server is started");
    
})