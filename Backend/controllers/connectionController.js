const userSchema = require("../module/user");

/**
 *@route POST /api/connect 
 * @param {{college, name, email, role, profileImage, tag, bio, department, interests, posts. followAcc..}} req.user 
 */
async function getConnections(req, res){
    const user = req.user;

    try{    
        const Followers = await userSchema.countDocuments({followedAcc: user._id});
        const posts = await userSchema.populate(user, {path:  "posts",
            model: "Post",
        });

        res.status(201).json({
            message: "Connections fetched successfully",
            user: {
                college: user.college,
                name: user.name,
                email: user.email,
                No_of_Posts: user.posts.length,
                No_of_Community: user.Community.length,
                Followeing : user.followedAcc.length,
                Followers : Followers,
            },
            posts: posts.posts
        });
    }catch(err){
        console.error(err);
        
        res.status(500).json({message: "Error fetching connections"});
    }
}

module.exports = {
    getConnections
}