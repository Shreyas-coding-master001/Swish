// let express = require("express");
// let app = express();
// let path = require("path");
// let port = 3000;

// app.use(express.json());
// app.use(express.static(path.join(__dirname,"public")));
// app.use(express.urlencoded({extended: true}));


// app.listen(port,()=>console.log(`Server is running at htttp://localhost:${port}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

const app = express()

connectDB();

app.use(cors());
app.use(express.json())
app.use("/api/auth", authRoutes);

// const testRoute = require("./routes/test");
// app.use("/test",testRoute)

const PORT = process.env.PORT || 9000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
