const Category = require("../../model/category.model")

module.exports = class CategoryService{
    async fetchCategory(){
        try{
            return await Category.find();
        }catch(err){
            return res.status(500).json(errorResponse(500, true, MSG.INTERNAL_SERVER_ERROR))
        }
    }

    async addCategory(body){
        try{
            return await Category.create(body)
        }catch(err){
            return res.status(500).json(errorResponse(500, true, MSG.INTERNAL_SERVER_ERROR))
        }
    }
}