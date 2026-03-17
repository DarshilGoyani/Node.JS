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