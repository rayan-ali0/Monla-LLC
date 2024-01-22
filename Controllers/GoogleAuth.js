import User from "../Models/User.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

    export const addUser = async (req,res,next)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({id: user._id,role:user.role}, process.env.SECRET_TOKEN, {
                      expiresIn: "24h",
                    });
            res
                .cookie('token', token, {httpOnly: true,secure:true,sameSite:"None"})
                .status(200)
                .json({ message: "Login successful", data: user , token:token})
            
            } else {

            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({name: req.body.name, email: req.body.email, password: hashedPassword});
            await newUser.save();
            const token = jwt.sign({id: newUser._id,role:newUser.role}, process.env.SECRET_TOKEN, {
                expiresIn: "24h",
              });
             res
            .cookie('token', token, {httpOnly: true,secure:true,sameSite:"None"})
            .status(200)
            .json({ message: "sign up successful", data: newUser , token})
        
        }
         } catch (error){
           res.status(404).json(error.message)

        }
}


