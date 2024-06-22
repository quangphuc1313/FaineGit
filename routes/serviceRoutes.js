import { createService, deleteServiceById, getAllServices, getServiceById, updateServiceById } from "../controllers/serviceController.js";

import express from 'express'
const router = express.Router();

// Routes for CRUD operations
router.post('/', createService);
router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.put('/:id', updateServiceById);
router.delete('/:id', deleteServiceById);

// Export the router
export default router;
