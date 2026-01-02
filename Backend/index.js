require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authSection = require("./controllers/authSection");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

connectDB();

app.use(cors({
  origin: "http://localhost:5174",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authSection);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
