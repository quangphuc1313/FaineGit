// likeRoutes.js
import express from 'express';
import {
    createLike,
    getAllLikes,
    getLikeById,
    updateLikeById,
    deleteLikeById
} from '../controllers/likeController.js';

const router = express.Router();

// Routes
router.post('/likes', createLike);
router.get('/likes/:user', getAllLikes);
router.get('/likes/:id', getLikeById);
router.put('/likes/:id', updateLikeById);
router.delete('/likes/:id', deleteLikeById);

export default router;
