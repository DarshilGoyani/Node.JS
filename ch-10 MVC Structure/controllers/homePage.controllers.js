const homePage = (req,res) => {
    return res.render("home")
}

const aboutPage = (req,res) => {
    return res.render("about")
}

const employeePage = (req,res) => {
    return res.render("empTable")
}

const empForm = (req,res) => {
    return res.render("empForm")
}
module.exports = {homePage,aboutPage,employeePage,empForm}