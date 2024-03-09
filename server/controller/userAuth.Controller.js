import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import USER from "../models/userAuth.Models.js";

export const register = async (req, res) => {
    try {
        const { username, email, password, } = req.body;

        // Check if the email is already registered
        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new USER({ username, email, password: hashedPassword, admin: false });
        // console.log(newUser)
        const savedUser = await newUser.save();

        res.status(201).json({ message: "Registration successful", user: savedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const user = await USER.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { _id: user._id, username: user.username, email: user.email, admin: user.admin, image: user.image },
            process.env.SECRET,
            { expiresIn: "1d" }
        );

        // Set JWT token in a secure, HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 days
        });

        res.status(200).json({ status: true, message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle error more gracefully
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token").send({ status: true, message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}