import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{ $ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (err) {
        console.error("Error in getUsersForSidebar",err.msg);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try{
        const { id: userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
              { senderId: myId, receiverId: userToChatId },
              { senderId: userToChatId, receiverId: myId },
            ],
          });

        res.status(200).json(messages);
    } catch (err) {
        console.log("Error in getMessages controller: ",err.msg);
        res.status(500).json({ msg: "Server Error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params; 
        const senderId = req.user._id; 

        if (!text && !image) {
            return res.status(400).json({ msg: "Message text or image is required." });
        }

        let imageUrl;
        if (image) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error("Error uploading image to Cloudinary:", uploadError);
                return res.status(500).json({ msg: "Image upload failed." });
            }
        }

        const newMessage = new Message({
            senderId, 
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (err) {
        console.error("Error in sendMessage controller:", err.message || err);
        res.status(500).json({ msg: "Server Error" });
    }
};
