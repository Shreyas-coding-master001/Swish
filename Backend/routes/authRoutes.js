const express = require("express");
const router = express.Router();

const {signup,signin} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.get("/me", protect, (req,res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
});

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;