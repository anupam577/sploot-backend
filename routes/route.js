import express from 'express';

import { createPost, getAllPosts } from '../controller/post-controller.js';
import { loginUser, singupUser,updateProfile } from '../controller/user-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';



const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', singupUser);





router.post('/users/:userId/articles',authenticateToken, createPost);
router.put('/users/:userId',authenticateToken, updateProfile);

router.get('/articles',authenticateToken, getAllPosts);






export default router;