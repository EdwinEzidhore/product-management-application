import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db.js';
import app from './App.js';
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); 
});
