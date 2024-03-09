import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import USER from "../models/userAuth.Models.js";

// get all user
export const getAllUser = async (req, res) => {
    try {
        const allUsers = await USER.find()
        res.status(200).json({ success: true, data: allUsers })
    } catch (error) {
        res.status(400).json({ success: false, message: `Something went wrong ! Error is : ${error}` })
    }
}

// create users
export const createUser = async (req, res) => {
    const { email } = req.body;
    const existingUser = await USER.findOne({ email: email });
    // console.log("existingUser:", existingUser)
    if (existingUser) {
        res.status(400).json("Email already exists");
    } else {
        try {
            await new USER(req.body).save()
                .then((user) => {
                    return res.status(201).json({
                        success: true, message: `Your User successfully created wit the id : ${user._id}`
                    })
                })
                .catch((error) => {
                    res.status(400).json({
                        success: false, message: `Something went wrong ! error is : ${error}`
                    })
                })
        } catch (error) {
            res.status(400).json({ success: false, message: `Something went wrong ! Error is : ${error}` })
        }
    }
}


// get dingle user
export const getSingleUser = async (req, res) => {
    const { id } = req.params;
    const singleUser = await USER.findById(id)

    if (!singleUser) {
        res.status(200).send({ success: true, message: `User not fount in the id : ${id}` })
    } else {
        res.status(200).json({ success: true, data: singleUser })
    }
}

// update existing users
export const updateUser = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const findUser = await USER.findById(id);
    console.log(findUser)
    if (!findUser) {
        res
            .status(404)
            .json({ success: false, message: `User with the id: ${id} not found` });
        return;
    }

    try {
        // If the request contains a new password, hash it
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        console.log(req.body)
        // Update the user document with the new data
        await USER.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: `User with the id: ${id} updated successfully`,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error updating user: ${error.message}` });
    }
}


// delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const findUser = await USER.findById(id)

    if (!findUser) {
        res.status(200).json({ success: true, message: `User with the id: ${id} is not found` })
    } else {
        await USER.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "User deleted successfully!" })
    }
}