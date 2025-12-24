const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const Port = process.env.PORT || 3000;
const authSection = require("./controllers/authSection")

require("dotenv").config();

app.set("view engine","ejs");

connectDB();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use("/api/auth",authSection)

app.get("/",(req,res)=>{
    res.render("index");
});

app.listen(Port, () => console.log(`Server is running ${Port}`));