import mongoose from 'mongoose';

const masterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        default: '',
    },

    level: {
        type: Number,
        default: 0,
    },

    superLevel: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
);

export default mongoose.model('master', masterSchema)