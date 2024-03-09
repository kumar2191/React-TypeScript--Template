import express from "express"
import { getAllDiseases } from "../controller/diseases.Controller.js"

const router = express.Router()
// get all user
// http://localhost:5000/api/v1/diseases
router.get("/", getAllDiseases);


export default router;