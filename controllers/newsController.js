import News from '../models/newsModel';

export const getAllNews = async (req, res) => {
    try {
        const news = await News.find().sort({ publishDate: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createNews = async (req, res) => {
    try {
        const news = new News(req.body);
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateNews = async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteNews = async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
