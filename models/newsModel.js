import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    author: {
        type: String,
        required: true,
    },
    publishDate: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.model('News', newsSchema);
