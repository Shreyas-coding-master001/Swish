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

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    description: {
      type: String,
      trim: true,
      default: ""
    },

    media: {
      type: String
    },

    community: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community"
    },

    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    }],

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
    },

    comments: [commentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
