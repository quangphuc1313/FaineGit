import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        default: '',
    },

    price: {
        type: Number,
        require: true
    },

},
    { timestamps: true }
);

export default mongoose.model('services', serviceSchema)