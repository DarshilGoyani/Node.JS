const mongoose = require("mongoose");
const PORT = process.env.mongo_URI



mongoose.connect(PORT).then(() => {
    console.log("mongoDB connected Successfully");
    
}).catch((err) => {
    console.log("MongoDb is not connected");
    
})
    