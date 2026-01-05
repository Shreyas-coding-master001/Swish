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

const postSchema = new mongoose.Schema(
  {
  user: {type: mongoose.Schema.Types.ObjectId, required: true, trim: true, ref: "users"},
  
  likedAcc: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }],

  Descprition: {type: String, required: false, trim: true, default: ""},

  Comments : [{type: String, trim: true }],

  Post : {type:String, required:true, trim: true},

  Community: [{type: String, required: true, trim: true}],

  reposts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }],

  shares: {
    type: Number,
    default: 0
  },

  views: {
    type: Number,
    default: 0
  }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Post", postSchema);
