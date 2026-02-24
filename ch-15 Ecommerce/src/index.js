const dotenv = require("dotenv").config()

const express = require("express")
const PORT = connect.env.PORT

const app = express();

app.use("/api", require("../src/routes/index"))

app.listen(err => {
    if (err) {
        console.log("err ", err);
        return false;
    }
    console.log("Server is Started");
    
})
