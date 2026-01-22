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
const ChnagesPost = require("./controllers/ChnagesPost");
const community = require("./controllers/communityPage");
const comminityModel = require("./module/comminity");

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
app.use("/community", community);

app.use("/uploads", express.static("uploads"));

// app.use(express.static(path.join(__dirname, "public")));
app.use("/api/auth", authSection);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users", isLogged, async (req,res)=>{
  const user = await req.user.populate("Community");
  console.log(user);
  
  res.send(user);
})

app.get("/DisplayPost",isLogged, async (req,res)=>{
  const user = req.user;
  
  const posts = await postModel.find({Community: user.college}).populate("user")
  .then(data=>res.send(data.reverse()))
  .catch(err=>res.status(401).send(err.message));
});

app.get("/DisplayPostCommunity/:CommunityName",isLogged, async (req,res)=>{
  const user = req.user;
  const Community = req.params.CommunityName;

  console.log("In Display Post!!");
  
  const comminityPosts = await comminityModel.findOne({Community}).populate({
        path: "posts",
        populate: {
          path: "user",
          model: "users",
        }
      });
  if(!comminityPosts){res.status(404).send("Community not found")}

  res.send(comminityPosts.posts.reverse());
  
});

app.post("/postInput", isLogged, uploads.single("media"), async (req,res)=>{
  try {
    const user = req.user;
    
    // Create the post
    const post = await postModel.create({
      user: user._id,
      Descprition: req.body.description,
      Community: [user.college],
      Post: `/uploads/Posts/${req.file.filename}`
    });

    // Add post ID to user's posts
    user.posts.push(post._id);
    await user.save();

    // Add post ID to community's posts
    const communityData = await comminityModel.findOneAndUpdate(
      { Community: user.college },
      { $push: { posts: post._id } },
      { new: true }
    );

    // Fetch and return updated posts for the community
    const posts = await postModel.find({Community: user.college}).populate("user");
    
    res.send(posts.reverse());
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

app.get("/logout",(req,res)=>{
  res.cookie("token","")
  res.redirect("/");
})

app.listen(Port, () => console.log(`Server is running ${Port}`));
