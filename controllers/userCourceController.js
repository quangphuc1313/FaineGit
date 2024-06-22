// controllers/userCourseController.js
import UserCource from '../models/userCourceModel';

export const getUserCources = async (req, res) => {
    try {
        const userId = req.user._id;
        const userCources = await UserCource.find({ user: userId }).populate('cource');
        res.status(200).json(userCources);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
