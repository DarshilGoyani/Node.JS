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


// login page
const loginPage = (req, res) => {

    if (req.cookies.adminId) {
        return res.redirect("/dashboard");
    }

    return res.render("auth/login");
};

// login adnmin
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

// log out admin
const logOut = (req,res) => {
    res.clearCookie("adminId");
    return res.redirect("/")
}

// dashboard page
const homepage = async (req,res) => {

    const admin = await Admin.findById(req.cookies.adminId);

    if (req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }

    return res.render("dashboard",{admin})
}

// form page
const formPage = async (req,res) => {
    const admin = await Admin.findById(req.cookies.adminId);
    if (req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }
    return res.render("admin/form",{admin})
}

// table page
const tablePage = async (req,res) => {
    const admin = await Admin.findById(req.cookies.adminId);

    if (req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }
    let allAdmin = await Admin.find();
    allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);
    return res.render("admin/table",{allAdmin , admin})
}

// add new admin
const insertAdmin = async (req, res) => {

    if (req.file) {
        req.body.profile_image = req.file.path;
    }

    const newAdmin = await Admin.create(req.body);
    console.log(req.cookies);
    
    res.cookie("name","Darshil Goyani");
    return res.redirect("/");
};

// delete admin
const deleteAdmin = async (req, res) => {
    const admin = await Admin.findById(req.cookies.adminId);

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

// update admin page
const updateAdminPage = async (req,res) => {
    const admin = await Admin.findById(req.cookies.adminId);

    if (req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }
    const updateAdmin = await Admin.findById(req.query.id); 
    return res.render("admin/edit",{updateAdmin,admin,isProfile: req.query.isProfile})
}

// update admin logic
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
    
    if (req.body.isProfile == "false") {
        return res.redirect("/tablePage");
    }
    else{
        return res.redirect("profile")
    }
    
};

// change password
const changePasswordPage = (req,res) => {
    res.render("auth/changePassword")
}

const changePassword = async (req,res) => {
    const admin = await Admin.findById(req.cookies.adminId);

    if (req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }
    // console.log(req.body);
    const {current_pass,new_pass,confirm_pass} = req.body;
    console.log(current_pass);
    console.log(new_pass);
    console.log(confirm_pass);
    
    if (admin.password != current_pass) {
        console.log("old and new password doesnt match");
        return res.redirect("/changePasswordPage")
    }
    
    if (new_pass == current_pass) {
        console.log("old and new password should not be same");
        return res.redirect("/changePasswordPage")
    }
    
    if (new_pass != confirm_pass) {
        console.log("new and confirm password doesnt match");
        return res.redirect("/changePasswordPage")
    }
    
    await Admin.findByIdAndUpdate(admin.id,{password : new_pass})
    res.redirect("/")
}

// view profile page
const viewProfilePage = async (req,res) => {
    const admin = await Admin.findById(req.cookies.adminId);

    if (req.cookies.adminId == undefined) {
        console.log("Admin not found");
        return res.redirect("/")
    }
    return res.render("admin/profile",{admin})
}


module.exports = {homepage,formPage,tablePage,insertAdmin,upload,deleteAdmin,updateAdminPage,updateAdmin,loginPage,checkAdmin,logOut,changePasswordPage,changePassword,viewProfilePage}