const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/SwishDB");

const model = mongoose.userSchema({
    username: String,
    email : String,
})

module.exports=userSchema("users",model);