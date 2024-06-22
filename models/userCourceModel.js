// models/userCourseModel.js
import mongoose from "mongoose";

const userCourceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    cource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cources',
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model('UserCource', userCourceSchema);
