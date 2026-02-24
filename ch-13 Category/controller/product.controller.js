const Product = require('../model/product.model');
const Category = require('../model/category.model');
const SubCategory = require('../model/subCategory.model');
const ExtraCategory = require('../model/extraCategory.model');
const fs = require('fs');

// Product Controllers
module.exports.addProductPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const categories = await Category.find();
        const subCategories = await SubCategory.find().populate('categoryId');
        const extraCategories = await ExtraCategory.find().populate('categoryId').populate('subCategoryId');
        
        console.log('Add Product - Categories count:', categories.length);
        console.log('Add Product - SubCategories count:', subCategories.length);
        console.log('Add Product - ExtraCategories count:', extraCategories.length);
        
        return res.render('product/addProduct', { categories, subCategories, extraCategories, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/dashboard');
    }
}

module.exports.addProduct = async (req, res) => {
    try {
        const admin = res.locals.admin;
        
        // Handle product image
        if (req.file) {
            req.body.image = req.file.path;
        }
        
        const product = await Product.create(req.body);
        if (product) {
            console.log("Product Added Successfully...");
            req.flash('success', 'Product added successfully!');
        } else {
            console.log("Product Addition Failed...");
            req.flash('error', 'Failed to add product. Please try again.');
        }
        return res.redirect('/viewProduct');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/addProduct');
    }
}

module.exports.viewProduct = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const products = await Product.find()
            .populate('categoryId')
            .populate('subCategoryId')
            .populate('extraCategoryId')
            .sort({ createdAt: -1 });
        const categories = await Category.find();
        const subCategories = await SubCategory.find().populate('categoryId');
        const extraCategories = await ExtraCategory.find().populate('categoryId').populate('subCategoryId');
        
        console.log('View Product - Products count:', products.length);
        console.log('View Product - Categories count:', categories.length);
        console.log('View Product - SubCategories count:', subCategories.length);
        console.log('View Product - ExtraCategories count:', extraCategories.length);
        
        return res.render('product/viewProduct', { products, categories, subCategories, extraCategories, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/dashboard');
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const product = await Product.findById(req.query.id)
            .populate('categoryId')
            .populate('subCategoryId')
            .populate('extraCategoryId');
        const categories = await Category.find();
        const subCategories = await SubCategory.find().populate('categoryId');
        const extraCategories = await ExtraCategory.find().populate('categoryId').populate('subCategoryId');
        return res.render('product/editProduct', { product, categories, subCategories, extraCategories, admin, currentPath: req.path });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.redirect('/viewProduct');
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        // Handle product image
        if (req.file) {
            req.body.image = req.file.path;
            const oldProduct = await Product.findById(req.params.id);
            if (oldProduct && oldProduct.image) {
                fs.unlink(oldProduct.image, () => {});
            }
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedProduct) {
            console.log("Product Updated Successfully...");
            req.flash('success', 'Product updated successfully!');
        } else {
            console.log("Product Update Failed...");
            req.flash('error', 'Failed to update product. Please try again.');
        }
        return res.redirect('/viewProduct');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/viewProduct');
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            // Delete main image
            if (product.image) {
                fs.unlink(product.image, () => {});
            }
            // Delete multiple images
            if (product.images && product.images.length > 0) {
                product.images.forEach(image => {
                    fs.unlink(image, () => {});
                });
            }
            console.log("Product Deleted Successfully...");
            req.flash('success', 'Product deleted successfully!');
        } else {
            console.log("Product Deletion Failed...");
            req.flash('error', 'Failed to delete product. Please try again.');
        }
        return res.redirect('/viewProduct');
    } catch (err) {
        console.log("Something went wrong", err);
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/viewProduct');
    }
}

// API for getting subcategories by category
module.exports.getSubCategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const subCategories = await SubCategory.find({ categoryId }).populate('categoryId');
        res.json(subCategories);
    } catch (error) {
        console.log("Something went wrong", error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

// API for getting extra categories by subcategory
module.exports.getExtraCategoriesBySubCategory = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        const extraCategories = await ExtraCategory.find({ subCategoryId }).populate('categoryId').populate('subCategoryId');
        res.json(extraCategories);
    } catch (error) {
        console.log("Something went wrong", error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}
