const dotenv = require("dotenv").config();
const express = require("express")
const PORT = process.env.PORT

const app = express();

app.use("/api", )

app.listen(err => {
    if (err) {
        console.log("err ", err);
        return false;
    }
    console.log("Server is Started");
    
})
