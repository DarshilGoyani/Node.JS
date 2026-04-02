const moment =  require("moment")
const status = require("http-status-code")
const Category = require("../../model/category.model")
const { errorResponse, successResponse } = require("../../utils/response.utils")
const { MSG } = require("../../utils/msg")
const CategoryService = require("../../services/category/category.service")
const categoryService = new CategoryService()

module.exports.fetchhAllCategory = async (req,res) => {
    try{
        const allCategory = await categoryService.fetchCategory()

        if (!allCategory) {
            return res.status(500).json(errorResponse(500, true, MSG.CATEGORY_NOT_ADDED))
        }

        return res.status(200).json(successResponse(200,false, MSG.CATEGORY_FETCHED, {allCategory}))

    }catch(err){
        return res.status(500).json(errorResponse(500, true, MSG.CATEGORY_NOT_FOUND))
    }
}

module.exports.addCategory = async (req,res) => {
    try{
        console.log("req body",req.body);
        console.log("req file",req.file);

        if (req.file) {
            req.body.category_image = req.file.path; 
        }

        req.body.created_at = moment().format('MMMM Do YYYY, h:mm:ss A');
        req.body.updated_at = moment().format('MMMM Do YYYY, h:mm:ss A');

        const category = await categoryService.addCategory(req.body)

        if (!category) {
            return res.status(500).json(errorResponse(500, true, MSG.CATEGORY_NOT_ADDED))
        }

        return res.status(200).json(successResponse(200,false, MSG.CATEGORY_CREATED))

    }catch(err){
        return res.status(500).json(errorResponse(500, true, MSG.INTERNAL_SERVER_ERROR))
    }
}

module.exports.updateCategory = async (req,res) => {
    try{
        
        const { id } = req.params;
        const category = await categoryService.updateCategory(id, req.body);

        if (!category) {
            return res.status(500).json(errorResponse(500, true, MSG.CATEGORY_NOT_UPDATED))
        }

        if (req.file) {
            req.body.category_image = req.file.path; 
        }

        req.body.updated_at = moment().format('MMMM Do YYYY, h:mm:ss A');

        return res.status(200).json(successResponse(200,false, MSG.CATEGORY_UPDATED))

    }catch(err){
        return res.status(500).json(errorResponse(500, true, MSG.INTERNAL_SERVER_ERROR))
    }
}

module.exports.deleteCategory = async (req,res) => {
    try{
        const { id } = req.params;

        const category = await categoryService.fetchSingleCategory(id);

        if (!category) {
            return res.status(404).json(errorResponse(404, true, MSG.CATEGORY_NOT_FOUND))
        }

        await categoryService.deleteCategory(id);
        
        return res.status(200).json(successResponse(200,false, MSG.CATEGORY_DELETED))

    }catch(err){
        return res.status(500).json(errorResponse(500, true, MSG.INTERNAL_SERVER_ERROR))
    }
}