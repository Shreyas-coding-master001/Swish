const User = require("../models/User")
const bcrypt = require("bcrypt");

const signup = async (req,res) => {
    try{
        const{college, name, email, password, role } = req.body;

        if(!college || !name || !email || !password || !role){
            return res.status(400).json({
                message: "Please fill all the required details"
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                message: "User already exists with this email"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({college,name,email,password: hashedPassword,role})
        
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });
    } catch(error){
        console.error("Signup error:", error);
        res.status(500).json({
        message: "Server error during signup"
        });
    }
};

const signin = async (req,res) => {
    try{
        const{email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({email});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch) {
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }

        res.status(200).json({
            message: "Login Successful",
            user:{
                id: user._id,
                college: user.college,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }catch(error){
        console.error("Signin error: ",error);
        res.status(500).json({
            message: "Server error during signin"
        });
    }
}

module.exports = {signup,signin};