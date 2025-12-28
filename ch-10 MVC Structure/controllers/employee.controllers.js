const addEmp = (req,res) => {
    return res.render("empForm")
}

const viewEmp = (req,res) => {
    return res.render("empTable")
}

module.exports({addEmp,viewEmp})