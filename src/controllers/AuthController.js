const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All * marked fields are required."
            });
        }

        const existingUser = await User.findOne({
         $or: [
            { email: email }, 
            { username: username}
        ] 
    });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
             name,
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const login = async (req, res) => {
    try{
    const {emailOrUsername, password} = req.body;

    if(!emailOrUsername || !password) {
        return res.status(400).json({
            success: false,
            message: "All * marked fields are required."
        });
    }

    const user = await User.findOne({
         $or: [
            { email: emailOrUsername }, 
            { username: emailOrUsername }
        ] 
    });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: " Check your email/username and password."
        });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }   
        else {
             const token = jwt.sign({
                 id: user._id 
                },
                 process.env.JWT_SECRET,
                 { expiresIn: '24h' });

        res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user:{
            userId: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        }
    });     
        }
});
     
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    register,
    login
};