const dotenv = require("dotenv").config();

const express = require("express")

const morgan = require('morgan');

const app = express();
require("./config/db.config")

const PORT = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));

app.use("/api", require("./routes/index"))


app.listen(PORT, (err) => {
    if (err) {
        console.log("error" , err);
        return false;
    }
    console.log("Server is started");
    
})