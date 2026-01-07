const express = require("express")
require("./config/db.config")
const Game = require("./model/game.model");
const path = require("path");
const PORT = 8000;

const app = express()

app.set("view engine","ejs");
app.use(express.urlencoded())
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.use("/", require("./routes/index"))

app.listen(PORT,(err) => {
    if (err) {
        console.log("Server is not started",err);
        return false;
    }
    console.log("Server is started");
    
})