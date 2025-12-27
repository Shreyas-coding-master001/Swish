const express = require("express");
const router = express.Router();
const User = require("../module/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParse = require("cookie-parser");
const multer = require("multer");
const path = require("path");

router.use(express.json());  
router.use(express.urlencoded({extended: true}));
router.use(cookieParse());

router.get("/",(req,res)=>{});

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null,"uploads/");
    },
    filename: (req, file, cb)=> {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage })

router.post("/signup", upload.single("profileImage"), async (req, res) => {
    try {
        const {college,name,email,password,role,tag,bio,department,interests} = req.body;

        const profileImage = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({college,name,email,password: hash,role,profileImage,tag,bio,department,interests});

        res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Signup failed" });
    }
});


router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,  
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});

router.get("/profile", async (req, res) => {
    const token = req.cookies.token;   

    if (!token) {
        return res.status(401).json({ message: "Not logged in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        res.json(user);
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});

// router.post("/logout", (req, res) => {
//     res.clearCookie("token");
//     res.status(200).json({ message: "Logged out successfully" });
// });

module.exports = router;