import express from 'express';
import auth from '../middleware/auth.js';
import { createUserSearch, getAllUserSearch, getUserSearchById, getUserSearchByToken, GetAllHistory } from '../controller/userSearchController.js';

const router = express.Router();

router.get('/getall/usersearch', auth, getAllUserSearch);
router.get('/:id', auth, getUserSearchById);
router.post('/add', auth, createUserSearch);
router.get('/user/getall', GetAllHistory);

router.get('/user/token', auth, getUserSearchByToken);

export default router;