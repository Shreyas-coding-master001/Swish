const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    college: {type: String, required: true, trim: true},
    name : {type: String, required: true, trim: true},
    email : {type: String, required: true, unique: true, trim: true},
    password : {type: String, required: true},
    role : {type: String, enum: ["Student", "Faculty", "Alumni", "Community member"], default: "Student"}
},
    {timestamps: true}
)

module.exports=mongoose.model("users",userSchema);