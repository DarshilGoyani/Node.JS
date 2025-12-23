const mongoose = require("mongoose")

const URI =  "mongodb://localhost:27017/Pharma_Web"

mongoose.connect(URI).catch((err) => {
    console.log("server  not started due to error ");
    
}).then(() => {
    console.log("server is started");
    
})