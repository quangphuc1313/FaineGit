// Import necessary modules
import express from 'express';
import {
    createMaster,
    getAllMasters,
    getMasterById,
    updateMasterById,
    deleteMasterById,
} from '../controllers/masterController.js'; // Adjust the path based on your file structure

// Create an Express router
const router = express.Router();

// Routes for CRUD operations
router.post('/', createMaster); // Create a new master
router.get('/', getAllMasters); // Get all masters
router.get('/:id', getMasterById); // Get a specific master by ID
router.put('/:id', updateMasterById); // Update a master by ID
router.delete('/:id', deleteMasterById); // Delete a master by ID

// Export the router
export default router;
