const Category = require('../model/category.model');
const fs = require('fs');

// Category Controllers
module.exports.addCategoryPage = async (req, res) => {
    const admin = res.locals.admin;
    return res.render('category/addCategory', { admin, currentPath: req.path });
}

module.exports.addCategory = async (req, res) => {
    try {
        const admin = res.locals.admin;
        if (req.file) {
            req.body.image = req.file.path;
        }
        
        const category = await Category.create(req.body);
        if (category) {
            console.log("Category Added Successfully...");
            req.flash('success', 'Category added successfully!');
        } else {
            console.log("Category Addition Failed...");
            req.flash('error', 'Failed to add category. Please try again.');
        }
        return res.redirect('/viewCategory');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/addCategory');
    }
}

module.exports.viewCategory = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const categories = await Category.find().sort({ createdAt: -1 });
        
        console.log('View Categories - Count:', categories.length);
        console.log('View Categories - Data:', JSON.stringify(categories, null, 2));
        
        return res.render('category/viewCategory', { categories, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/dashboard');
    }
}

module.exports.editCategory = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const category = await Category.findById(req.query.id);
        return res.render('category/editCategory', { category, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/viewCategory');
    }
}

module.exports.updateCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
            const oldCategory = await Category.findById(req.params.id);
            if (oldCategory && oldCategory.image) {
                fs.unlink(oldCategory.image, () => {});
            }
        }
        
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedCategory) {
            console.log("Category Updated Successfully...");
            req.flash('success', 'Category updated successfully!');
        } else {
            console.log("Category Update Failed...");
            req.flash('error', 'Failed to update category. Please try again.');
        }
        return res.redirect('/viewCategory');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/viewCategory');
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (category && category.image) {
            fs.unlink(category.image, () => {});
        }
        if (category) {
            console.log("Category Deleted Successfully...");
            req.flash('success', 'Category deleted successfully!');
        } else {
            console.log("Category Deletion Failed...");
            req.flash('error', 'Failed to delete category. Please try again.');
        }
        return res.redirect('/viewCategory');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/viewCategory');
    }
}
