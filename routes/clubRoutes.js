import express from 'express';
import {
    createClub,
    getAllClubs,
    getClubById,
    updateClubById,
    deleteClubById
} from '../controllers/clubController.js'; // Adjust the path based on your file structure

const router = express.Router();

// Create a new club
router.post('/', createClub);

// Get all clubs
router.get('/', getAllClubs);

// Get a specific club by ID
router.get('/:id', getClubById);

// Update a club by ID
router.put('/:id', updateClubById);

// Delete a club by ID
router.delete('/:id', deleteClubById);

export default router;
