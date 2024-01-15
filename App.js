import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/MongoConfig.js";
import cors from "cors";
import { userRoutes } from "./Routes/userRoutes.js";
import { login } from "./Middlewares/authentication.js";
import { logOut } from "./Middlewares/authentication.js";
const app = express();
import {productRoutes}  from './Routes/productRoutes.js'
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const PORT = process.env.PORT;

app.listen(PORT, (error) =>{ 
    if(!error) {
        console.log("Server is Running, and App is listening on port "+ PORT) 
    } else {
        console.log("Error: ", error)
    }
} 
);
connectDB()
app.use('/product',productRoutes)
app.use(cookieParser());
app.use("/user", userRoutes);
app.post("/login", login);
app.get("/logout", logOut);
