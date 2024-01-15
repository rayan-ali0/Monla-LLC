// authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import bcrypt, { compare } from 'bcrypt'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    console.log("reached here")
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

// Check Role
export const checkRole = (roles) => {
  return (req, res, next) => {
    try {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        res.status(500).send("Access denied. You have no permission to do that!");
      }
    } catch {
      return res.status(404).json({
        error: 404,
        message: "Not authorized",
      });
    }
  };
};

// login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        { _id: user._id, role: user.role },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "24h",
        }
      );
      const isSecure = process.env.NODE_ENV === 'producion';
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: isSecure,
          sameSite: 'None',
        })
        .status(200)
        .json({ user, token });
    } else {
      res.status(401).json({ error: "Email or Password is incorrect" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// This is just to check if the user if Authorized or not
export const authenticateUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    next(); 
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const logOut = (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully Logged Out!" });
};
