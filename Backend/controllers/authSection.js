const express = require("express");
const router = express.Router();
const User = require("../module/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParse = require("cookie-parser");

router.use(express.json());  
router.use(express.urlencoded({extended: true}));
router.use(cookieParse());

router.get("/",(req,res)=>{});

router.post("/signup",(req,res)=>{
    username = req.body.name;
    college = req.body.college;
    email = req.body.email;
    password = req.body.password;
    role = req.body.role;
    profileImage = req.body.profileImage;
    tag = req.body.tag;
    bio = req.body.bio;
    department = req.body.department;
    interests = req.body.interests;
    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            if(err) return res.status(400).send("Salt Error");

            await User.create({
                college,
                name : username,
                email,
                password: hash,
                role: role,
                profileImage : profileImage,
                tag : tag,
                bio : bio,
                department : department,
                interests : interests
            }).then(data => res.send("Data Send", data))
            .catch(err => console.log("Error occured!!",err)
            );
        });
    });    

});

router.post("/signin", async (req,res)=>{
    const {email,password} = req.body;
    let user =  await User.findOne({email});


    if(!password || !email){
        return res.send("Empty Password or Email");
    }
    if(!bcrypt.compare(password ,user.password)){
            
        return res.status(400).json({
            message:"Invalid email or password"
        });
    }

    let token = jwt.sign({email: user.email},process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
    res.cookie("token",token);

    res.status(200).json({
        message: "Login successful",
    });


});

module.exports = router;