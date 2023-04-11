import express from 'express';

import { createPost, getAllPosts } from '../controller/post-controller.js';
import { loginUser, singupUser,updateProfile } from '../controller/user-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';



const router = express.Router();

router.post('/api/login', loginUser);
router.post('/api/signup', singupUser);





router.post('/api/users/:userId/articles',authenticateToken, createPost);
router.put('/api/users/:userId',authenticateToken, updateProfile);

router.get('/api/articles',authenticateToken, getAllPosts);






export default router;