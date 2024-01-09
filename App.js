import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import connectDB from './config/MongoConfig.js';
import cors from "cors"
import {userRoutes} from './Routes/userRoutes.js'
const app = express();

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));

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

// app.use('/user',userRoutes)
