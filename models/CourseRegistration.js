import mongoose from 'mongoose';

const courseRegistrationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cources',
        required: true,
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['registered', 'completed', 'dropped'],
        default: 'registered',
    }
}, { timestamps: true });

export default mongoose.model('CourseRegistration', courseRegistrationSchema);
