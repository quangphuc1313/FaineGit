import express from 'express';
import { getAllNews, getNewsById, createNews, updateNews, deleteNews } from '../controllers/newsController';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth';

const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', isAuthenticatedUser, authorizeRoles('admin'), createNews);
router.put('/:id', isAuthenticatedUser, authorizeRoles('admin'), updateNews);
router.delete('/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteNews);

export default router;
