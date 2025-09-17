import dotenv from 'dotenv';
dotenv.config({ path: "./config/.env" });
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.name}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }  
}
