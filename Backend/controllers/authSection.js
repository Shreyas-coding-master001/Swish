const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../module/user");
const upload = require("../config/multer");

const router = express.Router();

router.post("/signup", upload.single("profileImage"), async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    password: hash,
    profileImage: req.file ? `/uploads/Posts/${req.file.filename}` : null
  });

  res.status(201).json(user);
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

  res.cookie("token", token, { httpOnly: true });
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

// router.post("/logout", (req, res) => {
//     res.clearCookie("token");
//     res.status(200).json({ message: "Logged out successfully" });
// });

module.exports = router;
