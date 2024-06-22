import Master from '../models/masterModel.js'; // Adjust the path based on your file structure

// Create a new master
export const createMaster = async (req, res) => {
    try {
        const { name, description, phone, image, level, superLevel } = req.body;
        const newMaster = new Master({ name, description, phone, image, level, superLevel });
        const savedMaster = await newMaster.save();
        res.status(201).json(savedMaster);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all masters
export const getAllMasters = async (req, res) => {
    try {
        const masters = await Master.find();
        res.status(200).json(masters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a specific master by ID
export const getMasterById = async (req, res) => {
    try {
        const { id } = req.params;
        const master = await Master.findById(id);
        if (!master) {
            return res.status(404).json({ error: 'Master not found' });
        }
        res.status(200).json(master);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a master by ID
export const updateMasterById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMaster = await Master.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMaster) {
            return res.status(404).json({ error: 'Master not found' });
        }
        res.status(200).json(updatedMaster);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a master by ID
export const deleteMasterById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMaster = await Master.findByIdAndDelete(id);
        if (!deletedMaster) {
            return res.status(404).json({ error: 'Master not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
