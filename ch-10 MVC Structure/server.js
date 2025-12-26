const express = require("express")
const homeController = require("./controllers/homePage.controllers")
const routes = require("./routes/index")
const PORT = 8000;

const app = express();

app.set("view engine","ejs")

app.use("/", routes)



app.listen(PORT,(err) => {
    if (err) {
        console.log("Server is not started");
        return false
    }
    console.log("Server is started");
     
})