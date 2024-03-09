import mongoose from "mongoose";

// Define the collection name
const collectionName = "diseases";

// Create a schema for the diseases collection
const diseaseSchema = new mongoose.Schema({}, { collection: collectionName });

// Create a model without a schema
let Disease;
try {
    // Try to retrieve the existing model
    Disease = mongoose.model(collectionName);
} catch (e) {
    // If the model doesn't exist, create a new one
    Disease = mongoose.model(collectionName, diseaseSchema);
}

// Get all diseases
export const getAllDiseases = async (req, res) => {
    try {
        // Fetch all diseases from the database
        const diseases = await Disease.find({});
        
        res.status(200).json({ success: true, data: diseases });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch diseases", error: error.message });
    }
};
