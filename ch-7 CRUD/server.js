let express = require('express')
let PORT = 8000;

let app = express();

app.set("view engine", "ejs")

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

app.get('/',(re1,res) => {
    res.render("home",{
        admin:false,
        name: "Darshil",
        users:allUsers,
    });
})

app.get('/about',(req,res) => {
    res.render("about")
})

app.listen(PORT,(err) => {
    if (err) {
        console.log(`Server is not started due to error := ${err}`);
        return false;
    }

    console.log("Server is started!");
    
})