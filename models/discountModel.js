import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        lowercase: true
    },
    discount_num: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Category", categorySchema);