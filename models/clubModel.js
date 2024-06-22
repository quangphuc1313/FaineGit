import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
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

    address: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        default: '',
    },


    master: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'master',
    }],

    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'services',
        }
    ],

},
    { timestamps: true }
);

export default mongoose.model('club', clubSchema)