const Admin = require("../model/admin.model")
const multer = require("multer")
const fs = require("fs");
const path = require("path");
// multer
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"uploads/");
    },
    filename : (req,file,cb) => {
        cb(null, Date.now()+"-"+file.originalname);
    },
})

const upload = multer({storage});

const loginPage = (req,res) => {
    return res.render("auth/login")
}

const checkAdmin = async (req,res) => {
    console.log(req.body);

    const admin = await Admin.findOne({email : req.body.email});
    
    if (!admin && req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }
    
    if (req.body.password != admin.password) {
        console.log("password is incorrect");
        return res.redirect("/")
    }


    res.cookie("adminId" , admin._id)
    return res.redirect("/dashboard")
}

const logOut = (req,res) => {
    res.clearCookie("adminId");
    return res.redirect("/")
}

const homepage = async (req,res) => {
    if (req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }
    return res.render("dashboard")
}

const formPage = (req,res) => {
    if (req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }
    return res.render("form")
}

const tablePage = async (req,res) => {
    if (req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }
    const allAdmin = await Admin.find();
    return res.render("table",{allAdmin})
}

const insertAdmin = async (req, res) => {

    if (req.file) {
        req.body.profile_image = req.file.path;
    }

    const newAdmin = await Admin.create(req.body);
    console.log(req.cookies);
    
    res.cookie("name","Darshil Goyani");
    return res.redirect("/");
};

const deleteAdmin = async (req, res) => {
    if (req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);

    if (deletedAdmin) {
        fs.unlink(deletedAdmin.profile_image, () => { });
        console.log("Admin deleted successfully...");
    } else {
        console.log("Admin deletion failed...");
    }

    return res.redirect("/tablePage");
};

const updateAdminPage = async (req,res) => {
    if (req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }
    const updateAdmin = await Admin.findById(req.params.id); 
    return res.render("edit",{updateAdmin})
}

const updateAdmin = async (req, res) => {

    const oldAdmin = await Admin.findById(req.body.id);

    if (req.file) {
        if (oldAdmin.profile_image) {
            fs.unlink(oldAdmin.profile_image, () => {});
        }
        req.body.profile_image = req.file.path;
    }

    await Admin.findByIdAndUpdate(req.body.id,req.body,{ new: true }
    );

    return res.redirect("/tablePage");
};




module.exports = {homepage,formPage,tablePage,insertAdmin,upload,deleteAdmin,updateAdminPage,updateAdmin,loginPage,checkAdmin,logOut}