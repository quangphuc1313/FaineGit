import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },

    clubs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'club',
    },
    time: {
        type: String,
        default: ''
    }

},
    { timestamps: true }
);

export default mongoose.model('email', emailSchema)