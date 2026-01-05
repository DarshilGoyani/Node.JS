const mongoose = require("mongoose")
const multer = require("multer")
const Games = require("../model/game.model")
const fs = require("fs")
const path = require("path");


const homePage =async (req,res) => {
    const allGames = await Games.find();
    return res.render("table",{allGames});
}

const addgamepage = (req,res) => {
    return res.render("form");
}

const editgamepage = (req,res) => {
    return res.render("edit");
}

const addGame =async (req,res) => {

    if (req.files.logo) {
        req.body.logo = req.files.logo[0].path;
    }
    if (req.files.image) {
        req.body.image = req.files.image[0].path
    }


    console.log(req.body);
    const game = await Games.create(req.body);
    console.log(game);
    
    return res.redirect("/");
}


const updateGame = async (req, res) => {

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const gameId = req.body.id;
    const oldGame = await Games.findById(gameId);

    // 🔹 LOGO
    if (req.files?.logo) {
        if (oldGame.logo) {
            const oldLogoPath = path.join(__dirname, "..", oldGame.logo);
            if (fs.existsSync(oldLogoPath)) {
                fs.unlinkSync(oldLogoPath);
            }
        }
        req.body.logo = req.files.logo[0].path;
    }

    // 🔹 IMAGE
    if (req.files?.image) {
        if (oldGame.image) {
            const oldImagePath = path.join(__dirname, "..", oldGame.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        req.body.image = req.files.image[0].path;
    }

    await Games.findByIdAndUpdate(gameId, req.body);

    return res.redirect("/");
};



const deletebtn = async (req,res) => {
    console.log(req.params.id);
    const deletedGame =await Games.findByIdAndDelete(req.params.id)
    fs.unlink(deletedGame.logo, (err) => { })
    fs.unlink(deletedGame.image, (err) => { })
    return res.redirect("/");
}

const editbtn = async (req,res) => {
    const gameId = await Games.findById(req.params.id);
    console.log(req.params.id);
    
    return res.render("edit",{gameId}) 
}

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,"uploads/")
    },
    filename : (req,file,cb) => {
        cb(null, Date.now()+`-`+file.originalname)
    }
})

const upload = multer({storage})

module.exports = {homePage,editgamepage,addgamepage,addGame,deletebtn,editbtn,updateGame,upload}