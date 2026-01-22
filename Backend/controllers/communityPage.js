const express = require("express");
const router = express.Router();
const isLogged = require("../Middleware/Loggedin");
const communityModel = require("../module/comminity");
const postModel = require("../module/post");
const uploads = require("../config/LogoMulter");

router.get("/", isLogged, async (req,res)=>{
    try{
        let user = req.user;
        let posts = await postModel.find({Community : user.college});
        const comminityPage = await communityModel.find({users: user._id}).populate("users").populate("posts");
    
        if(comminityPage.length === 0){
            let community = await communityModel.create({
                Community : user.college,
                users : [user._id],
                posts: posts.map((ele)=>ele._id),
            });
        res.send(community);
        }else{
            console.log("Present Page Community wala");
            res.send(comminityPage);
        }
        // await user.save();
    }catch(err){
        res.status(401).send(err);
    }
});

router.post("/Create", isLogged, uploads.single("coverImage"), async (req,res)=>{
    try{
        let user = req.user;

        let community = await communityModel.create({
            Community: req.body.name,
            users : [user._id],
            logo: `uploads/Logos/${req.file.filename}`,
            Description: req.body.description,
            Category: req.body.category,
            Visibility: req.body.visibility,
            role: "admin"
        });

        user.Community.push(community._id);
        await user.save();
        res.send("Done");
    }catch(err){
        res.status(401).send(err);
    }
});


module.exports = router;