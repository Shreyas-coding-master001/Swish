const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../module/user");

const router = express.Router();


const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "Admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


router.patch("/users/:id/role", requireAuth, async (req, res) => {
  const { role } = req.body;

  const allowedRoles = ["student", "faculty", "alumni", "community member"];

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = role;
  await user.save();

  res.json({ message: "Role updated", role: user.role });
});


router.patch("/users/:id/status", requireAuth, async (req, res) => {
  const { status } = req.body;

  if (!["Active", "Blocked"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.status = status;
  await user.save();

  res.json({ message: "Status updated", status: user.status });
});


module.exports = router;
