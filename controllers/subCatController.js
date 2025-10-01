const SubCategory = require('../models/subCategoryModel');
const dbConnect = require('../lib/dbConnect');
const CustomError = require('../lib/customError');


const getAllSubCategory = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const subCats = await SubCategory.find({user_id: userId});
        if(subCats.length === 0) throw new CustomError("No sub-categories", 404);
        res.status(200).json(subCats);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

const getSubCategory = async (req, res) => {
    try{
        await dbConnect();
        const subCat = await SubCategory.findById(req.params.id);
        if(subCat.length === 0) throw new CustomError("Couldn't find the sub-category", 404);
        res.status(200).json(subCat);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

const createSubCategory = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        const {category, sub_cat_name} = req.body;
        if(!category || !sub_cat_name) throw new CustomError("Category & Sub-Category names are mandatory", 400);
        const sub_category = await SubCategory.create({
            user_id: userId,
            category: category,
            sub_cat_name: sub_cat_name
        });
        if(sub_category.length === 0) throw new CustomError("Failed to add sub_cat to the DB", 500);
        res.status(200).json(sub_category);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

const deleteSubCategory = async (req, res) => {
    try{
        await dbConnect();
        const deletedSubCat = await SubCategory.findByIdbAndDelete(req.params.id);
        if (deletedSubCat.length === 0) throw new CustomError("Can't delete the sub-category", 500);
        res.status(200).json(deletedSubCat);
    } catch(err){
        res.status(err.status || 500).json({ error: err.message });
    }
}

module.exports = {getAllSubCategory, getSubCategory, createSubCategory, deleteSubCategory}