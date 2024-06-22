// routes/userCourseRoutes.js
import express from 'express';
import { getUserCources } from '../controllers/userCourceController';
import { isAuthenticatedUser } from '../middleware/auth';

const router = express.Router();

router.get('/user/cources', isAuthenticatedUser, getUserCources);

export default router;
