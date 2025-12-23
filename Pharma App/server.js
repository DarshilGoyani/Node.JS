const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const db = require("./config/db.config")
const medicine = require("./model/medicine.model") 
const PORT = 8000;

const app = express()

app.set("view engine","ejs")
app.use(express.urlencoded())
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


app.get("/",async (req,res) => {
    let allMedicines = await medicine.find()
    res.render("table",{allMedicines})
})

app.get("/addMedicine", async (req,res) => {

    const allMedicines = await medicine.find()

    res.render("form")
})

app.post("/addMedicine",upload.single("img"), async (req,res) => {
    console.log(req.body);
    
    // medicine.create(req.body).then(() => {
    //     console.log("medicine is added");
        
    // }).catch((err) => {
    //     console.log("medicine is not added due to error");
        
    // })

    req.body.img = req.file.path;
    const medicineAdded = await medicine.create(req.body)

    if (medicineAdded) {
        console.log("MEdicine Inserted Successfully");
        
    }
    else{
        console.log("Medicine not inserted");
        
    }

    res.redirect("/")
})

app.get("/deleteMedicine/:medicineID",async (req,res) => {
    const deletedMdecine = await medicine.findByIdAndDelete(req.params.medicineID)
    fs.unlink(deletedMdecine.img, (err) => {})
    res.redirect("/")
})

app.post("/editMedicine",upload.single("img"), async (req,res) => {
    console.log(req.body);

    if (req.file) {
        const oldMedicine  = await medicine.findById(req.body.id)
        req.body.img = req.file.path;
        fs.unlink(oldMedicine.img, (err) => {})

        const updatedMedicine = await medicine.findByIdAndUpdate(req.body.id,req.body,{new:true})
        res.redirect("/")
    }
    else{
        const updatedMedicine = await medicine.findByIdAndUpdate(req.body.id,req.body,{new:true})
        res.redirect("/")
    }
    
    console.log(updatedMedicine);
    
    return res.redirect("/")
})

app.get("/editMedicine/:medicineID", async (req,res) => {
    const Medicine = await medicine.findById(req.params.medicineID)

    if (Medicine) {
        return res.render("edit",{Medicine})
    }
    else{
        return res.redirect("/")
    }

    return res.redirect("/")
})




app.listen(PORT,(err) => {
    if (err) {
        console.log("Server is not started := ", err);
        return false;
    }
    console.log("Server is Started");
    
})