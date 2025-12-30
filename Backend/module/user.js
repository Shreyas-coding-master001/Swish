const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
        college: {type: String, required: true, trim: true},
        name : {type: String, required: true, trim: true},
        email : {type: String, required: true, unique: true, trim: true},
        password : {type: String, required: true},
        role : {type: String, enum: ["student", "faculty", "alumni", "community member"], default: "student"},
        profileImage : {type: String, required: true},
        tag : {type: String,trim: true, unique: true},
        bio : {type: String, trim: true, required: true},
        department : {type:String, trim: true},
        interests : {type:String, trim: true}
    },
    {timestamps: true}
);

// const imageSchema = new mongoose.Schema({
//   image: {
//     data: Buffer,
//     contentType: String
//   }
// });


module.exports=mongoose.model("users",userSchema);