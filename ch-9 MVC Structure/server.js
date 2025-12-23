const express = require("express")
const homeController = require("./controllers/homePage.controllers")
const PORT = 8000;

const app = express();



app.listen(PORT,(err) => {
    if (err) {
        console.log("Server is not started");
        return false
    }
    console.log("Server is started");
     
})