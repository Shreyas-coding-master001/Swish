const userModel = require("../module/user");

async function isUserExist(req, res, next) {
    const {email, name} = req.body;

    if(!email || !name){
        console.log("Email or name not provided");
        return res.status(400).send("Email and name are required");
    }

    try{
        const user = await userModel.findOne({ 
            $or:[
                {email: email},
                {name: name}
            ]
        });

        req.user = user;
        next();
    }catch(err){
        console.error("Auth error:", err.message);
        return res.status(401).send(err.message);
    }
  
}

module.exports = isUserExist;
