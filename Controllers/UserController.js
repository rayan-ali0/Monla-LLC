import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userController = {
  register: async (req, res) => {
    const { name, email, number, address, password, role } = req.body;
    try {
      if (!password || typeof password !== 'string') {
        return res.status(400).json({ error: "Invalid password in the request body" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        name,
        email,
        number,
        address,
        password: hashedPassword,
        role: role || "user",
      });
      await newUser.save();

      const isSecure = process.env.NODE_ENV === 'production';
      const token = jwt.sign({ userId: newUser._id, role: newUser.role,email, name }, process.env.SECRET_TOKEN, { expiresIn: '24h' });
      res.cookie('token', token, { httpOnly: true, secure: isSecure, sameSite: 'None' });
  
      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getOneUser: async ( req,res)=>{
    const userId = req.user._id;
    try{
        const user = await User.findById(userId)
        if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ error: "User not found" });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Internal Server Error"+error.message });
    }
  },
  
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a specific user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "key one" + error.message });
    }
  },

  // Update a user by ID
  updateUserById: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a user by ID
  deleteUserById: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default userController;