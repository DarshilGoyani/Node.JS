const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
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

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
