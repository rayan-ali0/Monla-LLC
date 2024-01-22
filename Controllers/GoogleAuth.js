import User from "../Models/User.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"



// const token = jwt.sign(
//     { _id: user._id, role: user.role },
//     process.env.SECRET_TOKEN,
//     {
//       expiresIn: "24h",
//     }
//   );

//   return res
//     .cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//     })
//     .status(200)
//     .json({ message: "Login successful", data: user , token});

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
            // const generatedName = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);
            const newUser = new User({name: req.body.name, email: req.body.email, password: hashedPassword});
            await newUser.save();
            // const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            // const { password: pass, ...rest} = newUser._doc;
            // res
            //     .cookie('access_token', token, {httpOnly: true})
            //     .status(200)
            //     .json(rest);
            const token = jwt.sign({id: newUser._id,role:newUser.role}, process.env.SECRET_TOKEN, {
                expiresIn: "24h",
              });
      res
          .cookie('token', token, {httpOnly: true,secure:true,sameSite:"None"})
          .status(200)
          .json({ message: "sign up successful", data: newUser , token})
      
        }
    } catch (error){
        // next(error);
        res.status(404).json(error.message)

    }
}




// export const addUser=async(req,res)=>{
//     // let user=req.body;
//     // let user=req.user
//     // user.role= req.body.role || "user"
//     user.password=Math.random().toString(36).slice(-8)
// const {name,email}=req.body
//     try {
//         let findUser= await User.findOne({
//             email:email
//         })
//         if(findUser){
//             const token= jwt.sign({
//                 role:findUser.role, userId:findUser.id
//             },process.env.SECRET_TOKEN,
//             {expiresIn:"24h"}
//             )

//             const { name, email , password, } = findUser;
//             let newUser = { name, email, role, password };
//             return res.status(200).json({ newUser, token });
//         }else{
//             try {
//                 try {
//                     const hashedPass = await bcrypt.hash(user.password, 10);
//                     const newOne = await User.create({
//                       ...user,
//                       password: hashedPass,
//                       role: user.role,
//                     });
//                     const token = jwt.sign(
//                       { role: newOne.role, userId: newOne.id },
//                       process.env.SECRET_TOKEN,
//                       { expiresIn: "24h" }
//                     );
//                     const { name, role,  email, } = newOne;
//                     let newUser = { name, email };
//                     return res.status(200).json({ newUser, token });
//                   } catch (error) {
//                     console.error(error);
//                     return res.status(500).json({ error: "Error creating user" });
//                   }
//             } catch (error) {
//                 console.log(error);
//                 return res.status(400).json(error);
//             }
//         }
//     } catch (error) {
        
//     }
// }

