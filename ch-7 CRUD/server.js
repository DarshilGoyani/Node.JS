let express = require('express')
let PORT = 8000;

let app = express();

app.set("view engine", "ejs")
app.use(express.urlencoded())

let allUsers = [
    {
        id:101,
        name:"Darshil",
        email:"darshilgoyani05@gmail.com",
        password:"dfwfwfwefw",
        phone:464665468,
        address:"Surat",
    },
    {
        id:102,
        name:"Sujal",
        email:"sujalkidecha@gmail.com",
        password:"bdjvwbkvbfk",
        phone:6846686546,
        address:"Ahmedabad",
    },
    {
        id:103,
        name:"Jenish",
        email:"jenishpardva@gmail.com",
        password:"bvjhdhvkjebv",
        phone:896132469168,
        address:"Vadodara",
    },
]

app.post("/insertUser",(req,res) => {
    const user = req.body;
    console.log(user);
    user.id = Math.floor(Math.random() * 1000)
    allUsers.push(user)
    res.redirect("/",{
        users:allUsers
    })
})

app.post("/updateUser",(req,res) => {
    console.log(req.body.id);
    console.log(allUsers);
    
    
    allUsers = allUsers.map((user) => {
        if (user.id == req.body.id) {
            return req.body;
        }
        else{
            return user
        }
    })
    
    console.log(allUsers);
    
    res.redirect("/")
    
})

app.get("/editUser", (req,res) => {


    const user = allUsers.find((user) => user.id == req.query.id)
    if (!user) {
        return res.redirect('/')
    }
    res.render('updateForm',{user}

    )
    
})

app.get('/',(req,res) => {
    res.render("home",{
        users:allUsers,
        name:"Darshil"
    });
})

app.get('/form',(req,res) => {
    res.render("form")
})

app.get('/deleteUser',(req,res) => {
    console.log(req.query.id);
    
    allUsers = allUsers.filter((user) => user.id != req.query.id)
    console.log(allUsers);
    
    res.redirect('/')
})

app.get('/homePage',(req,res) => {
    res.render("home",{
        users:allUsers,
    })
})

app.listen(PORT,(err) => {
    if (err) {
        console.log(`Server is not started due to error := ${err}`);
        return false;
    }

    console.log("Server is started!");
    
})