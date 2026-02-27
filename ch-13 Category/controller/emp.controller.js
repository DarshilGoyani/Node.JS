const Admin = require('../model/admin.model')
const Category = require('../model/category.model')
const SubCategory = require('../model/subCategory.model')
const ExtraCategory = require('../model/extraCategory.model')
const nodemailer = require('nodemailer');
const fs = require('fs');

// Session Remove
function sessionRemove(req, res) {
    console.log("Session Remove");

    req.session.destroy((err) => {
        if (!err) {
            console.log("Session Removed");
            return res.redirect('/');
        }
        console.log("Error : ", err);
    });
}

module.exports.dashborad = async (req, res) => {
    const admin = res.locals.admin;
    return res.render('dashboard', { admin, currentPath: req.path });
}

module.exports.viewadmin = async (req, res) => {
    try {
        const admin = res.locals.admin;
        let allAdmin = await Admin.find();
        allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);
        return res.render('admin/table', { allAdmin, admin, currentPath: req.path })
    } catch (error) {
        console.log("Something went wrong");
        console.log("Error : ", error);
        return res.redirect('/dashboard');
    }
}

module.exports.addAdminPage = async (req, res) => {
    const admin = res.locals.admin;
    return res.render('admin/form', { admin, currentPath: req.path })
}

module.exports.profile = async (req, res) => {
    const admin = res.locals.admin;
    return res.render('admin/profile', { admin, currentPath: req.path })
}

module.exports.verifyEmail = async (req, res) => {
    console.log(req.body);
    try {
        const myAdmin = await Admin.findOne(req.body);

        if (!myAdmin) {
            console.log("Admin not found....");
            req.flash('error', 'Email not found in our system.');
            return res.redirect('/');
        }

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.user,
                pass: process.env.pass
            }
        });
        const OTP = Math.floor(10000000 + Math.random() * 90000000).toString();
        const htmlTemplate = `
<div style="background-color: #f4f7f9; padding: 50px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        <tr>
            <td style="padding: 40px 0 20px 0; text-align: center; background-color: #212529;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Admin Panel</h1>
            </td>
        </tr>
        
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="color: #333333; font-size: 20px; margin-top: 0;">Verification Required</h2>
                <p style="color: #666666; font-size: 15px; line-height: 1.6;">
                    Hello Administrator, <br>
                    You requested a secure access code for your account. Please use the following One-Time Password (OTP) to complete the verification process.
                </p>
                
                <div style="margin: 30px 0; text-align: center;">
                    <div style="display: inline-block; background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 15px 30px;">
                        <span style="font-size: 32px; font-weight: 700; color: #0d6efd; letter-spacing: 8px;">${OTP}</span>
                    </div>
                </div>
                
                <p style="color: #888888; font-size: 13px; text-align: center; margin-top: 20px;">
                    This code will expire in <strong>10 minutes</strong>. <br>
                    If you did not make this request, please secure your account immediately.
                </p>
            </td>
        </tr>
        
        <tr>
            <td style="padding: 20px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #eeeeee;">
                <p style="color: #aaaaaa; font-size: 12px; margin: 0;">
                    &copy; 2026 Security Systems | Internal Use Only
                </p>
            </td>
        </tr>
    </table>
</div>
`;
        const info = await transporter.sendMail({
            from: '"Admin Panel" <darshilgoyani05@gmail.com>',
            to: req.body.email,
            subject: "Otp Verification",
            html: htmlTemplate
        });

        console.log(info.messageId);

        req.session.OTP = OTP;
        req.session.resetAdminId = myAdmin._id;

        return res.redirect('/Otp-Page');

    } catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }
}

module.exports.otpPage = async (req, res) => {
    try {
        if (!req.session.OTP || !req.session.resetAdminId) {
            return res.redirect('/');
        }
        return res.render('auth/otpPage');
    }
    catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }
}

module.exports.VerifyOtp = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.session);

        if (req.body.OTP !== req.session.OTP) {
            console.log("Invalid Otp");
            req.flash('error', 'Invalid OTP. Please try again.');
            return res.redirect('/Otp-Page');
        }

        req.session.OTP = null;
        return res.redirect('/change-password');


    } catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }

}
module.exports.forgotPasswordPage = async (req, res) => {
    try {
        if (!req.session.resetAdminId) {
            return res.redirect('/');
        }
        return res.render('auth/forgotPassword');
    }
    catch (error) {
        console.log('Something Went Wrong', error);
        return res.redirect('/');
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.session);

        if (!req.session.resetAdminId) {
            console.log("Invalid session");
            return res.redirect('/Otp-Page');
        }

        if (req.body.newPass !== req.body.ConfPass) {
            console.log("New and Confirm Password not matched");
            return res.redirect('/change-password');
        }

        const updatePassword = await Admin.findByIdAndUpdate(
            req.session.resetAdminId,
            { password: req.body.newPass },
            { new: true }
        );

        req.session.resetAdminId = null;
        req.session.OTP = null;

        if (updatePassword) {
            console.log("Password Update...");
            return res.redirect('/');
        } else {
            console.log("Password Not Update...");
            return res.redirect('/');
        }

    } catch (err) {
        console.log("Something went wrong", err);
        return res.redirect('/');
    }
}


module.exports.changePasswordPage = async (req, res) => {
    const admin = res.locals.admin;
    return res.render('auth/changePassword', { admin, currentPath: req.path })
}
module.exports.changePassword = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const { currentPass, newPass, ConfPass } = req.body;

        if (currentPass != admin.password) {
            console.log('Current Password Is Not Matched Original Password!!');
            req.flash('error', 'Current password is incorrect.');
            return res.redirect('/change-password')
        }

        if (newPass === admin.password) {
            console.log("New Password or original Password Is Matched!! try Again");
            req.flash('error', 'New password cannot be the same as current password.');
            return res.redirect('/change-password')
        }

        if (ConfPass != newPass) {
            console.log("Confirm Password Note Matched New Password!!");
            req.flash('error', 'New password and confirm password do not match.');
            return res.redirect('/change-password')
        }

        const ChangePass = await Admin.findByIdAndUpdate(admin._id, { password: newPass }, { new: true });
        console.log(ChangePass);

        if (ChangePass) {
            console.log("Password Updated!!!");
            req.flash('success', 'Password updated successfully! Please login again.');
        } else {
            console.log("Password Updation failed!!!");
            req.flash('error', 'Password update failed. Please try again.');
        }

        sessionRemove(req, res);

    } catch (error) {
        console.log("Delete error:", error);
        return res.redirect('/');
    }
}

module.exports.loginPage = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    return res.render('auth/login');
}

module.exports.logout = (req, res) => {
    sessionRemove(req, res);
};

module.exports.login = async (req, res) => {
    try {

        req.flash('success', 'Login successful!');
        return res.redirect('/dashboard');

    } catch (error) {
        req.flash('error', 'Login failed. Please try again.');
        console.log('Something Went Wrong', error);
        return res.redirect('/')
    }
}

module.exports.addAdmin = async (req, res) => {
    try {

        console.log(req.body);
        try {
            if (req.file) {
                req.body.profile_image = req.file.path;
            }
            const AddAdmin = await Admin.create(req.body);
            if (AddAdmin) {
                console.log("Admin Insertion SuccessFully!");
                req.flash('success', 'Admin added successfully!');
                return res.redirect('/viewAdmin')
            }
            else {
                console.log("Admin Insertion failed!");
                req.flash('error', 'Failed to add admin. Please try again.');
                return res.redirect('/addAdmin')
            }
        } catch (error) {
            console.log("Something Went Wrong", error);
        }
    } catch (error) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

module.exports.deleteAdmin = async (req, res) => {
    try {
        const currentAdmin = res.locals.admin;

        if (currentAdmin.email !== "darshilgoyani05@gmail.com") {
            return res.redirect('/viewAdmin');
        }

        const id = req.params.id;
        const deleteAdmin = await Admin.findByIdAndDelete(id);

        if (deleteAdmin) {
            if (deleteAdmin.profile_image && fs.existsSync(deleteAdmin.profile_image)) {
                fs.unlinkSync(deleteAdmin.profile_image);
            }
            console.log("Admin Deleted Successfully!");
            req.flash('success', 'Admin deleted successfully!');
        }

        return res.redirect('/viewAdmin');

    } catch (err) {
        console.log("Delete error:", err);
        return res.redirect('/');
    }
}

module.exports.editAdmin = async (req, res) => {
    try {
        const singleAdmin = await Admin.findById(req.params.id);
        const returnTo = req.query.returnTo || '/viewAdmin';
        return res.render('admin/edit', { singleAdmin, currentPath: req.path, returnTo });
    } catch (err) {
        console.log(err);
        return res.redirect('/viewAdmin');
    }
}

module.exports.updateAdmin = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        console.log(req.file);

        if (req.file) {

            req.body.profile_image = req.file.path;

            const updatedData = await Admin.findByIdAndUpdate(req.params.id, req.body);

            if (updatedData) {
                fs.unlink(updatedData.profile_image, () => { });
                console.log("Admin Updated Successfully...");
                req.flash('success', 'Admin updated successfully!');
            } else {
                console.log("Admin Updation Failed...");
                req.flash('error', 'Failed to update admin. Please try again.');
            }

        } else {

            const updatedData = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (updatedData) {
                console.log("Admin Updated Successfully...");
                req.flash('success', 'Admin updated successfully!');
            } else {
                console.log("Admin Updation Failed...");
                req.flash('error', 'Failed to update admin. Please try again.');
            }
        }
        const returnTo = req.body.returnTo || '/viewAdmin';

        return res.redirect(returnTo);
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error :", err);
        return res.redirect('/viewAdmin');
    }
}

module.exports.viewadmin = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const admins = await Admin.find();
        console.log('View Admins - Count:', admins.length);
        console.log('View Admins - Data:', JSON.stringify(admins, null, 2));
        return res.render('admin/view', { admins, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/dashboard');
    }
}

module.exports.addAdminPage = async (req, res) => {
    const admin = res.locals.admin;
    return res.render('admin/add', { admin, currentPath: req.path });
}