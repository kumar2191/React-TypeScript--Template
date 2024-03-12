import mongoose from "mongoose";

const diseasesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    symptoms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Symptom",
        }
    ],
    treatment: {
        image : [String],
        video : [String]
    },
    prevention: {
        image : [String],
        video : [String]
    }
    
});

const Diseases = mongoose.model("Diseases", diseasesSchema);

export default Diseases;