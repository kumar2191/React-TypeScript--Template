import mongoose from "mongoose";

const symptomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

const Symptom = mongoose.model("Symptom", symptomSchema);

export default Symptom;