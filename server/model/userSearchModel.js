import mongoose from "mongoose";

const userSearchSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    symptom: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Symptom"
        }
    ],
    diseasesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diseases"
    },
    date: {
        type: Date
    }
});

userSearchSchema.pre("save", function (next) {
    if (!this.date) {
        this.date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    }
    next();
});

const UserSearch = mongoose.model("UserSearch", userSearchSchema);

export default UserSearch;