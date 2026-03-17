const mongoose = require("mongoose")

mongoose.connect(process.env.mongo_URI).then(() => {
    console.log("mongoDB is connected");
    
}).catch((err) => {
    console.log("mongoDB is not connected", err);
    
})