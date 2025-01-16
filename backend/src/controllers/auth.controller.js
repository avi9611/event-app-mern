import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({ msg: "All fields must be filled" });
        }
        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters long" });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(200).json({ msg: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
        });
    } catch (err) {
        console.error("Error in signup controller:", err.message);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({msg: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid credentials"});
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
        })
    } catch (err) {
        console.log("Error in login controller",err.message);
        res.status(500).json({msg: "Server Error"});
    }
};

export const logout = (req, res) => {
    try{
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ msg: "Logged out successfully" });
    } catch (err) {
        console.log("Error in logout controller",err.message);
        res.status(500).json({msg: "Server Error"});
    }
};

export const updateProfile = async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user._id;
  
      if (!profilePic) {
        return res.status(400).json({ msg: "Profile picture is required" });
      }
  
      console.log("Profile Pic Input:", profilePic);
  
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "profile_pictures",
      });

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error("Error in update profile: ", err);
      res.status(500).json({ msg: "Server Error" });
    }
  };

export const checkAuth =(req,res) => {
    try{
        res.status(200).json(req.user)
    } catch (err) {
        console.log("error in check auth: ", err.msg);
        res.status(500).json({ msg: "Server Error" });
    }
}