const express = require("express")
const path = require("path")
require("./config/db.config")
const cookieParser = require("cookie-parser")
const PORT = 8000;

const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended : true}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use("/", require("./routes/"))



app.listen(PORT,(err) => {
    if (err) {
        console.log("Server is not started ",err);
        return false;
    }
    console.log("Server is started");
    
})