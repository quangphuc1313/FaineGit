// likeModel.js
import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Like', likeSchema);
