const express = require("express")
const multer = require("multer")
const db = require("./config/db.config")
const medicine = require("./model/medicine.model")
const PORT = 8000;

const app = express()

app.set("view engine","ejs")
app.use(express.urlencoded())
app.use("/uploads", express.static("uploads"));

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
    
    medicine.create(req.body).then(() => {
        console.log("medicine is added");
        
    }).catch((err) => {
        console.log("medicine is not added due to error");
        
    })
    res.redirect("/")
})

app.get("/deleteMedicine/:medicineID",async (req,res) => {
    const deletedMdecine = await medicine.findByIdAndDelete(req.params.medicineID)
    res.redirect("/")
})

app.post("/editMedicine",upload.single("img"), async (req,res) => {
    console.log(req.body);
    
    const updatedMedicine = await medicine.findByIdAndUpdate(req.body.id,req.body,{new:true})
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