import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/MongoConfig.js";
import cors from "cors";
import { userRoutes } from "./Routes/userRoutes.js";
import { login } from "./Middlewares/authentication.js";
import { logOut } from "./Middlewares/authentication.js";
import { modelRoutes } from "./Routes/modelRoutes.js";
import { yearRoutes } from "./Routes/yearRoutes.js";
import brandRouter from "./Routes/brandRoutes.js";
import { addUser } from "./Controllers/GoogleAuth.js";
import { serviceRoutes } from "./Routes/serviceRoutes.js";
import {contactRoutes} from './Routes/contactRoutes.js'
import {productRoutes}  from './Routes/productRoutes.js'
import { verifyToken } from "./Middlewares/authentication.js";
import { loggedInUser } from "./Middlewares/authentication.js";

import categoryRouter from "./Routes/categoryRoutes.js";
const app = express();

app.use(express.json());
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
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
app.use("/user", userRoutes);
app.use("/model",modelRoutes)
app.use("/year",yearRoutes)
app.use("/brand", brandRouter)
app.use("/google",addUser)
app.post("/login", login);
app.get("/logout", logOut);
app.use("/service", serviceRoutes);
app.use('/contact',contactRoutes)
app.use('/images',express.static('images'))

app.use("/logged-in-user", verifyToken, loggedInUser);
app.use("/google",addUser)
app.use("/category", categoryRouter)
// app.use("/images" ,express.static("images"))
