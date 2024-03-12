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
    diseasesId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diseases"
    },
});

const UserSearch = mongoose.model("UserSearch", userSearchSchema);

export default UserSearch;