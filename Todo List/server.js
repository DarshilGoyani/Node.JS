const express = require("express")
const fs = require("fs")

const PORT = 8000

const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded())

let allTask = [
    {
        id : 1,
        title : "Client Review & Feedback",
        task : "Crypto Wallet Redesign",
        date: "2006-01-05",
        startTime : "10:48",
        endTime : "20:48",
    },
]




app.get("/",(req,res) => {
    res.render("home",{
        task:allTask,
    })
})

app.get("/newTask",(req,res) => {
    res.render("form")
})

app.post("/addTask",(req,res) => {
    const task = req.body;
    console.log(task);
    task.id = Math.floor(Math.random() * 1000)
    allTask.push(task)
    res.render("home",{
        task:allTask
    })
    
})

app.post("/editTask",(req,res) => {
    allTask = allTask.map((task) => { 
        if (task.id == req.body.id) {
            return req.body;
        }
        else{
            return task
        }
    })
    console.log(allTask);
    
    res.redirect("/")
})

app.get("/editTask",(req,res) => {
    const task = allTask.find((task) => task.id == req.query.id)
    if (!task) {
        return res.redirect('/')
    }
    res.render("editForm",{task})
})

app.get("/deleteTask",(req,res) => {
    allTask = allTask.filter((task) => task.id != req.query.id)
    res.redirect('/')
})

app.get("/taskStatus",(req,res) => {
    
})

app.listen(PORT,(err) => {
    if (err) {
        console.log(`server is not started := ${err}`);
        return false
    }
    console.log('server is started');
    
})