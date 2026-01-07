const express = require("express")
const PORT = 8000

const app = express()

app.set("view engine" , "ejs")

const middleware = (req,res,next) => {
    console.log("middleware");
    if (!req.query.age) {
        return res.render("check");
    }
    if (req.query.age >= 18) {
        return next();
    }
    else{
        return res.render("notAccess")
    }
    
}
app.use(middleware)

app.get("/",(req,res) => {
    res.render("home")
})

app.get("/404",(req,res) => {
    res.render("404")
})


app.listen(PORT,(err) => {
    if (err) {
        console.log("server is not started due to error ");
        return false
    }
    console.log("server is started");
    
})