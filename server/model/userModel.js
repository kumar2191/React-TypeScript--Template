import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        unique: true,
        // required: true,
    },
    gender: {
        type: String,
        // required: true,
        enum: ["male","female","others"]
    },
    isAdmin: {
        type: Boolean,
        // required: true,
        default: false,
    },
});

const User = mongoose.model("User", userSchema);

export default User;