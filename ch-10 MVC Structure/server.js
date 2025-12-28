const express = require("express")
const db = require("./config/db.config")
const PORT = 8000;

const app = express();

app.set("view engine","ejs")
app.use(express.urlencoded())

app.use("/", require("./routes/index.routes"))



app.listen(PORT,(err) => {
    if (err) {
        console.log("Server is not started");
        return false
    }
    console.log("Server is started");
     
})