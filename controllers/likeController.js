// likeController.js
import Like from '../models/likeMordel.js';

// Create a new like
export const createLike = async (req, res) => {
    try {
        const { user, product } = req.body;
        const newLike = await Like.create({ user, product });
        res.status(201).json(newLike);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all likes
export const getAllLikes = async (req, res) => {
    try {
        const likes = await Like.find({ user: req.params.user }).populate('product');
        res.status(200).json(likes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a specific like by ID
export const getLikeById = async (req, res) => {
    try {
        const like = await Like.findById(req.params.id);
        if (!like) {
            return res.status(404).json({ error: 'Like not found' });
        }
        res.status(200).json(like);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a like by ID
export const updateLikeById = async (req, res) => {
    try {
        const { user, product } = req.body;
        const updatedLike = await Like.findByIdAndUpdate(
            req.params.id,
            { user, product },
            { new: true }
        );
        if (!updatedLike) {
            return res.status(404).json({ error: 'Like not found' });
        }
        res.status(200).json(updatedLike);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a like by ID
export const deleteLikeById = async (req, res) => {
    try {
        const deletedLike = await Like.findByIdAndDelete(req.params.id);
        if (!deletedLike) {
            return res.status(404).json({ error: 'Like not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
