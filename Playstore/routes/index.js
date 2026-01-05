const express = require("express");




const {homePage ,addgamepage,editgamepage,addGame,deletebtn,editbtn,updateGame,upload} = require("../controllers/game.controllers.js")

const router = express.Router();

router.get("/",homePage);
router.get("/addgamepage",addgamepage);
router.get("/editgamepage", editgamepage)
router.post("/addGame", upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "image", maxCount: 1 }
]) ,addGame)
router.post("/updateGame", upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "image", maxCount: 1 }
]) ,  updateGame)
router.get("/deletebtn/:id",deletebtn)
router.get("/editbtn/:id",editbtn)

module.exports = router;