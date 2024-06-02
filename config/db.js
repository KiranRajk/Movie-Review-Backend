import mongoose from "mongoose";
import { config } from "dotenv";
config()

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log("Connection error" , error);
    }
}
