const mongoose =  require ("mongoose")

const PORT = "mongodb://localhost:27017/EMP-Management"


mongoose.connect(PORT).then(() => {
    console.log("MongoDB is connected");
    
}).catch(err => {
    console.log("mongoDB is not started due to errors", err);
    
})
