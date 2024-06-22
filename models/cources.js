import mongoose from 'mongoose';

const courcesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    thumbnail: {
        type: String,
        default: '',
    },
    userView: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    discountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'discount',
    },
    minutes: { type: Number },
    chapter: [{
        title: { type: String },
        video_urls: [{ type: String }],
        index: { type: Number }
    }],
    master: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'master',
    },

    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'services',
        }
    ],

    price: {
        type: Number,
        require: true
    },

    quantity: {
        type: Number,
        require: true
    },
},
    { timestamps: true }
);

export default mongoose.model('Cources', courcesSchema)