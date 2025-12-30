const { default: mongoose } = require("mongoose");
const EMP = require("../model/emp.model")

const addEmp = async (req, res) => {
    try {
        await EMP.create(req.body);

        // Prevent duplicate insert on refresh
        return res.redirect("/employee");

    } catch (err) {
        console.log(err);
        return res.send("Something went wrong");
    }
};

const deleteEmp = async (req,res) => {
    const deletedEmp = await EMP.findByIdAndDelete(req.query.empId);
    return res.redirect("/employee/");
}

const updateEmp = async (req,res) => {
    const updatedEmp = await EMP.findByIdAndUpdate(req.body.id,req.body, {new:true});
    
    return res.redirect("/employee/");
}

const editEmpPage = async (req,res) => {
    const empData = await EMP.findById(req.params.empId);
    return res.render("editEmpForm",{empData});
}

const addEmpPage = (req,res) => {
    return res.render("empForm")
}

const allEmployeeView = async (req,res) => {
    const allEmployee = await EMP.find();
    return res.render("empTable",{allEmployee})
}


// fetch employee

module.exports={allEmployeeView,addEmp,addEmpPage,deleteEmp,updateEmp,editEmpPage}