import express from 'express';
import {
    createCource,
    getAllCources,
    getCourceById,
    updateCourceById,
    deleteCourceById,
} from '../controllers/courcesController.js';

const router = express.Router();

// Create a new Cource
router.post('/', createCource);

// Get all Cources
router.get('/', getAllCources);

// Get a specific Cource by ID
router.get('/:id', getCourceById);

// Update a Cource by ID
router.put('/:id', updateCourceById);

// Delete a Cource by ID
router.delete('/:id', deleteCourceById);


export default router;
