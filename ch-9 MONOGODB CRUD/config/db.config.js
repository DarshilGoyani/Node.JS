const mongoose = require("mongoose")



const URI = "mongodb://localhost:27017/Book-Management"

mongoose.connect(URI).catch((err) => {
    console.log("server is not started due to errors ",err);
    
}).then(() => {
    console.log("Server is started in mongodb");
    
}).finally(() => {
    console.log("Finally i am learning mongodb");
    
})