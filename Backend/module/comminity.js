const mongoose = require("mongoose");

const communitySchema = mongoose.Schema({
    Community: {type:String, trim:true},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "users"}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    logo:{type: String, trim: true, default: "/uploads/Logos/Gemini_Generated_Image_Logo.png"},
    Description:{type: String, trim: true },
    Category: {type: String, enum: ["tech", "education", "business", "sports"], default: "education"},
    Visibility: {type: String, default: "public"},
    role : {type: String, enum: ["student", "faculty", "alumni", "community member", "admin"], default: "student"},
});

module.exports = mongoose.model("Community",communitySchema);