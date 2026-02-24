const SubCategory = require('../model/subCategory.model');
const Category = require('../model/category.model');
const fs = require('fs');

// Sub Category Controllers
module.exports.addSubCategoryPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const categories = await Category.find();
        return res.render('category/addSubCategory', { categories, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/dashboard');
    }
}

module.exports.addSubCategory = async (req, res) => {
    try {
        const admin = res.locals.admin;
        if (req.file) {
            req.body.image = req.file.path;
        }
        
        const subCategory = await SubCategory.create(req.body);
        if (subCategory) {
            console.log("Sub Category Added Successfully...");
            req.flash('success', 'Sub category added successfully!');
        } else {
            console.log("Sub Category Addition Failed...");
            req.flash('error', 'Failed to add sub category. Please try again.');
        }
        return res.redirect('/viewSubCategory');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/addSubCategory');
    }
}

module.exports.viewSubCategory = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const subCategories = await SubCategory.find().populate('categoryId').sort({ createdAt: -1 });
        const categories = await Category.find();
        
        console.log('View SubCategories - Count:', subCategories.length);
        console.log('View SubCategories - Data:', JSON.stringify(subCategories, null, 2));
        console.log('View Categories - Count:', categories.length);
        
        return res.render('category/viewSubCategory', { subCategories, categories, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/dashboard');
    }
}

module.exports.editSubCategory = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const subCategory = await SubCategory.findById(req.query.id).populate('categoryId');
        const categories = await Category.find();
        return res.render('category/editSubCategory', { subCategory, categories, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/viewSubCategory');
    }
}

module.exports.updateSubCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
            const oldSubCategory = await SubCategory.findById(req.params.id);
            if (oldSubCategory && oldSubCategory.image) {
                fs.unlink(oldSubCategory.image, () => {});
            }
        }
        
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedSubCategory) {
            console.log("Sub Category Updated Successfully...");
            req.flash('success', 'Sub category updated successfully!');
        } else {
            console.log("Sub Category Update Failed...");
            req.flash('error', 'Failed to update sub category. Please try again.');
        }
        return res.redirect('/viewSubCategory');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/viewSubCategory');
    }
}

module.exports.deleteSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (subCategory && subCategory.image) {
            fs.unlink(subCategory.image, () => {});
        }
        if (subCategory) {
            console.log("Sub Category Deleted Successfully...");
            req.flash('success', 'Sub category deleted successfully!');
        } else {
            console.log("Sub Category Deletion Failed...");
            req.flash('error', 'Failed to delete sub category. Please try again.');
        }
        return res.redirect('/viewSubCategory');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/viewSubCategory');
    }
}
