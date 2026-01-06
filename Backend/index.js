require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const Port = process.env.PORT || 3000;
const authSection = require("./controllers/authSection")
const uploads = require("./config/multer");
const isLogged = require("./Middleware/Loggedin");
const postModel = require("./module/post");
const ChnagesPost = require("./controllers/ChangesPost");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/api/auth",authSection);
app.use("/post",ChnagesPost);

app.use("/uploads", express.static("uploads"));

// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/DisplayPost",isLogged, async (req,res)=>{
  const user = req.user;
  
  const posts = await postModel.find({Community: user.college}).populate("user")
  .then(data=>res.send(data.reverse()))
  .catch(err=>res.status(401).send(err.message));
});

app.post("/postInput", isLogged, uploads.single("media"), async (req,res)=>{
  const user = req.user;
  const post = await postModel.create({
    user: user._id,
    Descprition: req.body.description,
    Community: [user.college],
    Post: `/uploads/Posts/${req.file.filename}`
  }).then(data => {
    user.posts.push(data._id);
    console.log("Data Send");
  }).catch(err=> res.status(400).send(err.message));
 
  await user.save();

  res.redirect("/DisplayPost")
});


app.get("/logout",(req,res)=>{
  res.cookie("token","")
  res.redirect("/");
})

app.listen(Port, () => console.log(`Server is running ${Port}`));
