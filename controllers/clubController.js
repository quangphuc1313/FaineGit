// Import necessary modules
import Club from '../models/clubModel.js'; // Adjust the path based on your file structure

// Controller to create a new club
export const createClub = async (req, res) => {
    try {
        const newClub = await Club.create(req.body);
        res.status(201).json(newClub);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get all clubs
export const getAllClubs = async (req, res) => {
    try {
        const clubs = await Club.find().populate('master services');
        res.status(200).json(clubs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get a specific club by ID
export const getClubById = async (req, res) => {
    const { id } = req.params;
    try {
        const club = await Club.findById(id).populate('master services');
        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }
        res.status(200).json(club);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to update a club by ID
export const updateClubById = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedClub = await Club.findByIdAndUpdate(id, req.body, { new: true }).populate('master services');
        if (!updatedClub) {
            return res.status(404).json({ message: 'Club not found' });
        }
        res.status(200).json(updatedClub);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to delete a club by ID
export const deleteClubById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClub = await Club.findByIdAndRemove(id).populate('master services');
        if (!deletedClub) {
            return res.status(404).json({ message: 'Club not found' });
        }
        res.status(200).json(deletedClub);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
