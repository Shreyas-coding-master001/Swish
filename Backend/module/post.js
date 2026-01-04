// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   profilePhoto: {type: String, required: false, trim: true},
//   name: {type: String, required: false, trim: true},
//   isfollowed: {type: Boolean, default: false},
//   isliked: {type: Boolean, default: false},
//   repost: {type:Boolean, default: false},
//   share: {type:Boolean, default: false},
//   views: {type:Boolean, default:false },
//   Descprition: {type: String, required: false, trim: true, default: ""},
//   Community: {type: String, required: true, trim: true},
//   comments : {type: Array}
// });

// module.exports = mongoose.model("post",userSchema);

const mongoose = require("mongoose");

const userSechema = new mongoose.Schema({
  profilePhoto: {type: String, required: false, trim: true},
  user: {type: mongoose.Schema.Types.ObjectId, required: true, trim: true, ref: "users"},
  followedAcc: [{type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }],
  likedAcc: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }],
  Descprition: {type: String, required: false, trim: true, default: ""},
  Community: {type: String, required: true, trim: true},
  Comments : [{type: mongoose.Schema.Types.ObjectId,
    ref: "comment"
  }],
  Post : {type:String, required:true, trim: true}
});

module.exports = mongoose.model("Post", postSchema);
