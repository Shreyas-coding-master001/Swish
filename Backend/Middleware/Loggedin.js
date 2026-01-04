const userModel = require("../module/user");
const jwt = require("jsonwebtoken");

async function Loggedin(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
        console.log(req.cookies);
        
        console.log("Problem fetching the cookie");
        return res.status(401).send("Problem fetching the cookie");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
        console.log("Problem fetching the user");
        
        return res.status(401).send("Problem fetching the user");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).send(err.message);
  }
}

module.exports = Loggedin;
