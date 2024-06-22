import Cources from '../models/cources.js';
import Order from '../models/orderModel.js';
import Cource from '../models/cources.js';
// Create a new Cource
export const createCource = async (req, res) => {
    console.log('aaa')
    try {

        const newCource = await Cources.create({
            ...req.body,
            chapter: JSON.parse(req.body.chapters || '[]')
        });
        res.status(201).json(newCource);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Get all Cources
export const getAllCources = async (req, res) => {
    try {
        const cources = await Cources.find();
        res.status(200).json(cources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific Cource by ID
export const getCourceById = async (req, res) => {
    try {
        const cource = await Cources.findById(req.params.id);
        if (cource) {
            res.status(200).json(cource);
        } else {
            res.status(404).json({ message: 'Cource not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Cource by ID
export const updateCourceById = async (req, res) => {
    try {
        const updatedCource = await Cources.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedCource) {
            res.status(200).json(updatedCource);
        } else {
            res.status(404).json({ message: 'Cource not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Cource by ID
export const deleteCourceById = async (req, res) => {
    try {
        const deletedCource = await Cources.findByIdAndDelete(req.params.id);
        if (deletedCource) {
            res.status(200).json({ message: 'Cource deleted successfully' });
        } else {
            res.status(404).json({ message: 'Cource not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
