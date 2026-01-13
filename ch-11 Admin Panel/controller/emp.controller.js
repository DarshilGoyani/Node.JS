const Admin = require("../model/admin.model")
const multer = require("multer")
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer")
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

// forgot password page
const forgotPasswordPage = (req,res) => {
    return res.render("auth/forgotPassword")
}

const forgotPassword = async (req,res) => {

    console.log(req.body);
    // const admin = await Admin.findById(req.cookies.adminId);

    // if (req.cookies.adminId == undefined) {
    //     console.log("Admin not found");
    //     return res.redirect("/")
    // }

    const adminEmail = await Admin.findOne(req.body);

    // send otp
    let transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : "darshilgoyani05@gmail.com",
            pass : "mqhnbhxotmbovjgm"
        }
    })

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    const info = await transporter.sendMail({
        from: '"Sneat Admin Panel" <darshilgoyani05@gmail.com>',
        to: req.body.email,
        subject: "OTP Verification",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>OTP Verification</title>
  <style>
    /* Reset styles for email clients */
    body, table, td, a { text-decoration: none !important; }
    table { border-collapse: collapse !important; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; height: 100% !important; background-color: #f5f5f9; }
    
    /* Responsive styles */
    @media screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .otp-text { font-size: 28px !important; letter-spacing: 5px !important; }
    }
  </style>
</head>
<body>
  <center>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f9; padding: 20px 0;">
      <tr>
        <td align="center">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
            
            <tr>
              <td align="center" style="padding: 40px 0; background: linear-gradient(135deg, #696cff 0%, #3f42e3 100%);">
                <h1 style="color: #ffffff; margin: 0; font-family: 'Helvetica', Arial, sans-serif; font-size: 30px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">
                  Sneat Admin
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding: 40px 30px; font-family: 'Helvetica', Arial, sans-serif;">
                <h2 style="color: #566a7f; font-size: 22px; font-weight: 700; margin-top: 0;">Verification Required</h2>
                <p style="color: #697a8d; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                  Hi there! Use the code below to verify your account. For your security, please do not share this code with anyone.
                </p>
                
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" style="padding: 20px; background-color: #f2f2ff; border: 2px dashed #696cff; border-radius: 8px;">
                      <span class="otp-text" style="font-family: 'Courier New', Courier, monospace; font-size: 42px; font-weight: 800; color: #696cff; letter-spacing: 10px;">
                        ${OTP}
                      </span>
                    </td>
                  </tr>
                </table>

                <p style="color: #a1acb8; font-size: 13px; line-height: 1.6; margin-top: 30px;">
                  The verification code will be valid for <b>10 minutes</b>. If you did not request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding: 30px; background-color: #fcfcfd; border-top: 1px solid #ebedf0; text-align: center;">
                <p style="margin: 0; font-family: 'Helvetica', Arial, sans-serif; font-size: 12px; color: #a1acb8; line-height: 1.5;">
                  Sent by <strong>Sneat Admin Panel</strong><br>
                  123 Business Way, Gujarat, India<br>
                  &copy; 2024 All Rights Reserved
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`
    })
    
    
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


module.exports = {homepage,formPage,tablePage,insertAdmin,upload,deleteAdmin,updateAdminPage,updateAdmin,loginPage,checkAdmin,logOut,changePasswordPage,changePassword,viewProfilePage,forgotPasswordPage,forgotPassword}