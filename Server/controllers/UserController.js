import userModel from './../models/User.js';

export const registerUser = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        // ensure email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        //check if user already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await userModel.create({ username, email, password });

        if (!newUser) {
            return res.status(400).json({ message: "Failed to create user" });
        }
        res.status(201).json({success :true, message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({success:false, message: "Email and password are required" });
        }
        const user = await userModel.findOne({ email }).select("+password");

        if (!user || user.password !== password) {
            return res.status(401).json({success:false, message: "Invalid email or password" });
        }
        res.status(200).json({success:true, message: "Login successful" });
        
    } catch (error) {
        res.status(500).json({ success:false, message: "Server error", error: error.message });
    }
};