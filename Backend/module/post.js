const mongoose = require("mongoose");

const userSechema = new mongoose.Schema({
  profilePhoto: {type: String, required: false, trim: true},
  name: {type: String, required: false, trim: true},
  isfollowed: {type: Boolean, default: false},
  isliked: {type: Boolean, default: false},
  Descprition: {type: String, required: false, trim: true, default: ""},
  Community: {type: String, required: true, trim: true},
  comments : {type: Array}
});

module.exports = mongoose.model("post",userSechema);