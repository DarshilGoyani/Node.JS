const express = require("express")

const { allEmployeeView,addEmpPage,addEmp,deleteEmp,updateEmp,editEmpPage} = require("../controllers/employee.controllers")

const empRoute = express.Router();

empRoute.get("/",allEmployeeView)
empRoute.get("/addEmpPage",addEmpPage)
empRoute.post("/addEmp",addEmp)
empRoute.get("/deleteBtn",deleteEmp);
empRoute.get("/editBtn/:empId",editEmpPage);
empRoute.post("/updateEmp",updateEmp);


module.exports = empRoute;
