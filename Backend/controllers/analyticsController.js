const postModel = require("../module/post");
const mongoose = require("mongoose");

const getAnalytics = async (req, res) => {
  try {
    console.log("Decoded user:", req.user);
    const posts = await postModel.find();
    let totalLikes = 0;
    let totalComments = 0;
    const totalPosts = posts.length;

    for (const post of posts) {
      console.log("Post data:", post);
      console.log("Likes field:", post.likedAcc);
      console.log("Comments field:", post.Comments);
      totalLikes += (post.likedAcc || []).length;
      totalComments += (post.Comments || []).length;
    }

    const totalShares = 0;
    const engagementRate = totalPosts > 0 ? ((totalLikes + totalComments) / totalPosts).toFixed(2) : 0;

    res.status(200).json({
      totalLikes,
      totalComments,
      totalShares,
      totalPosts,
      engagementRate
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: "Failed to fetch analytics", error: error.message });
  }
};

const getUserEngagement = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("USER ID:", userId);

    const objectId = new mongoose.Types.ObjectId(userId);
    const posts = await postModel.find({
      $or: [
        { user: userId },
        { user: objectId },
        { author: userId },
        { author: objectId },
        { userId: userId },
        { userId: objectId },
        { postedBy: userId },
        { postedBy: objectId }
      ]
    });
    console.log("OBJECTID:", objectId);
    console.log("POSTS FOUND:", posts.length);
    console.log("POST SAMPLE:", posts[0]);

    let totalLikes = 0;
    let totalComments = 0;

    for (const post of posts) {
      totalLikes += (post.likedAcc || []).length;
      totalComments += (post.Comments || []).length;
    }

    res.status(200).json({
      userId,
      totalLikes,
      totalComments
    });

  } catch (error) {
    console.error("User analytics error:", error);
    res.status(500).json({ message: "Failed to fetch user analytics", error: error.message });
  }
};

module.exports = { getAnalytics, getUserEngagement };
