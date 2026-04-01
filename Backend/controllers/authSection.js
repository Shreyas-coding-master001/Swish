const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParse = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const comminityModel = require("../module/comminity");
const User = require("../module/user");
const upload = require("../config/multer");
const Post = require("../module/post");
const Logs = require("../module/logs");
const router = express.Router();

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
});

const uploadCommunity = multer({ storage });

// Community-aware signup: checks for community membership and assigns accordingly
router.post("/signup", upload.single("profileImage"), async (req, res) => {
  try {
    const {college, name, email, password, role, tag, bio, department, interests} = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;
    const hash = await bcrypt.hash(password, 10);
    const community = await comminityModel.findOne({Community: college});
    let user;
    if (community !== null) {
      user = await User.create({college, name, email, password: hash, role, profileImage, tag, bio, department, interests, Community: [community._id]});
      community.users.push(user._id);
      await community.save();
    } else {
      user = await User.create({college, name, email, password: hash, role, profileImage, tag, bio, department, interests});
    }
    await Logs.create({
      user: user._id,
      name: user.name,
      email: user.email,
      type: "user"
    });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Signup failed" });
  }
});


router.get("/logs", async (req, res) => {
  try {
    const logs = await Logs.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ logs });
  } catch (err) {
    res.status(500).json({ message: "No logs found" });
  }
});




router.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("User not found");

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(401).send("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

res.cookie("token", token, {
  httpOnly: true,
  sameSite: "lax",   // 🔥 REQUIRED
  secure: false      // 🔥 REQUIRED for localhost
});
  res.json(user);
});

router.get("/users", async (req, res) => {
  try { 
    const users = await User.find().select("-password");
    res.status(200).json(users); 
  } catch (err) {
    res.status(500).json({ message: "No user found" }); 
  } 
});

router.get("/totals",async (req,res) => {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    res.json({totalUsers,totalPosts});
})

router.get("/profile", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.patch("/profile",upload.single("profileImage"),async(req,res)=>{
  const token = req.cookies.token;
  if(!token) return res.status(401).json({message:"User not logged in"});

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (req.body.name) user.name = req.body.name;
      if (req.body.tag) user.tag = req.body.tag;
      if (req.body.bio) user.bio = req.body.bio;

      if (req.file) {
        user.profileImage = `/uploads/Posts/${req.file.filename}`;
      }

      await user.save();

      res.status(200).json({
        message: "Profile updated successfully",
        user
      });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
})

// router.post("/logout", (req, res) => {
//     res.clearCookie("token");
//     res.status(200).json({ message: "Logged out successfully" });
// });

module.exports = router;
