import express from 'express';

import { createSymptom, getAllSymptoms, getSymptomById, updateSymptom } from '../controller/symptomController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',auth, getAllSymptoms)
router.get('/:id',auth, getSymptomById)
router.put('/update',auth, updateSymptom)
router.post('/add',auth, createSymptom)

export default router;