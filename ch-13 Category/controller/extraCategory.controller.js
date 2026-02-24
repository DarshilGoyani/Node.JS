const ExtraCategory = require('../model/extraCategory.model');
const Category = require('../model/category.model');
const SubCategory = require('../model/subCategory.model');
const fs = require('fs');

// Extra Category Controllers
module.exports.addExtraCategoryPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const categories = await Category.find();
        const subCategories = await SubCategory.find().populate('categoryId');
        
        console.log('Categories count:', categories.length);
        console.log('SubCategories count:', subCategories.length);
        console.log('SubCategories:', JSON.stringify(subCategories, null, 2));
        
        return res.render('category/addExtraCategory', { categories, subCategories, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/dashboard');
    }
}

module.exports.addExtraCategory = async (req, res) => {
    try {
        const admin = res.locals.admin;
        if (req.file) {
            req.body.image = req.file.path;
        }
        
        const extraCategory = await ExtraCategory.create(req.body);
        if (extraCategory) {
            console.log("Extra Category Added Successfully...");
            req.flash('success', 'Extra category added successfully!');
        } else {
            console.log("Extra Category Addition Failed...");
            req.flash('error', 'Failed to add extra category. Please try again.');
        }
        return res.redirect('/viewExtraCategory');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/addExtraCategory');
    }
}

module.exports.viewExtraCategory = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const extraCategories = await ExtraCategory.find().populate('categoryId').populate('subCategoryId').sort({ createdAt: -1 });
        const categories = await Category.find();
        const subCategories = await SubCategory.find().populate('categoryId');
        return res.render('category/viewExtraCategory', { extraCategories, categories, subCategories, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/dashboard');
    }
}

module.exports.editExtraCategory = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const extraCategory = await ExtraCategory.findById(req.query.id).populate('categoryId').populate('subCategoryId');
        const categories = await Category.find();
        const subCategories = await SubCategory.find().populate('categoryId');
        return res.render('category/editExtraCategory', { extraCategory, categories, subCategories, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/viewExtraCategory');
    }
}

module.exports.updateExtraCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
            const oldExtraCategory = await ExtraCategory.findById(req.params.id);
            if (oldExtraCategory && oldExtraCategory.image) {
                fs.unlink(oldExtraCategory.image, () => {});
            }
        }
        
        const updatedExtraCategory = await ExtraCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedExtraCategory) {
            console.log("Extra Category Updated Successfully...");
            req.flash('success', 'Extra category updated successfully!');
        } else {
            console.log("Extra Category Update Failed...");
            req.flash('error', 'Failed to update extra category. Please try again.');
        }
        return res.redirect('/viewExtraCategory');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/viewExtraCategory');
    }
}

module.exports.deleteExtraCategory = async (req, res) => {
    try {
        const extraCategory = await ExtraCategory.findByIdAndDelete(req.params.id);
        if (extraCategory && extraCategory.image) {
            fs.unlink(extraCategory.image, () => {});
        }
        if (extraCategory) {
            console.log("Extra Category Deleted Successfully...");
            req.flash('success', 'Extra category deleted successfully!');
        } else {
            console.log("Extra Category Deletion Failed...");
            req.flash('error', 'Failed to delete extra category. Please try again.');
        }
        return res.redirect('/viewExtraCategory');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/viewExtraCategory');
    }
}
