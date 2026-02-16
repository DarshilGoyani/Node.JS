const mongoose = require('mongoose');

const extraCategorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const ExtraCategory = mongoose.model('ExtraCategory', extraCategorySchema);

module.exports = ExtraCategory;
