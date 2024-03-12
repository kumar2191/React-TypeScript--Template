import express from 'express';
import { createDisease, getAllDiseases, getDiseaseById, updateAddDiseaseSymptoms, updateRemoveDiseaseSymptoms } from '../controller/diseasesController.js';
import auth from '../middleware/auth.js';
import isOwner from '../middleware/isOwner.js';

const router = express.Router();

router.get('/',auth, getAllDiseases);
router.get('/:id',auth, getDiseaseById);
router.post('/add',auth, createDisease);
router.put("/update/add/symptoms",auth,  updateAddDiseaseSymptoms);
router.put("/update/remove/symptoms",auth,  updateRemoveDiseaseSymptoms);

export default router;