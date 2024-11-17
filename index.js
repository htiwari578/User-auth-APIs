import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/user.routes.js";
import connectDB from "./utils/db.js";

dotenv.config();


const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use(cors());
dotenv.config();
const corsOptions = {
    origin: 'http//localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;


// apis
app.use("/api/h1/user", userRoute);


app.listen(PORT , ()=> {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})







