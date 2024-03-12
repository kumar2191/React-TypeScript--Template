import express from 'express';
import { getALLUsers, getUserById, getUserByToken, loginUser, registerUser, updateUser } from '../controller/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getALLUsers);
router.post('/reg', registerUser);
router.post('/login', loginUser);
router.get('/profile', auth, getUserByToken);
router.put('/upprofile', auth, updateUser);
router.get('/:id',auth, getUserById);

export default router;