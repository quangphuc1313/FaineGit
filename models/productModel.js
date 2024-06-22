import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        collation: { locale: 'en', strength: 2 },
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        collation: { locale: 'en', strength: 2 },
    },

    unaccentedDescription: {
        type: String,
        lowercase: true,
        trim: true,
    },

    price: {
        type: Number,
        require: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
        require: true
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    shipping: {
        type: Boolean,
    },
},
    { timestamps: true }
);

// Thêm hook để cập nhật unaccentedName và unaccentedDescription trước khi lưu
productSchema.pre('save', function (next) {
    this.unaccentedName = removeDiacritics(this.name);
    this.unaccentedDescription = removeDiacritics(this.description);
    next();
});

// Hàm loại bỏ dấu
function removeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default mongoose.model('Product', productSchema)