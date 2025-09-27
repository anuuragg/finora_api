const SubCategory = require('../models/subCategoryModel');
const dbConnect = require('../lib/dbConnect')


const getAllSubCategory = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        if(!userId) return res.status(404).json("User ID missing");
        const subCats = await SubCategory.find({user_id: userId});
        if(!subCats) return res.status(404).json("No sub-categories found");
        res.status(200).json(subCats);
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

const getSubCategory = async (req, res) => {
    try{
        await dbConnect();
        const subCat = await SubCategory.findById(req.params.id);
        res.status(200).json(subCat);
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

const createSubCategory = async (req, res) => {
    try{
        await dbConnect();
        const userId = req.user.id;
        if(!userId) return res.status(404).json("User ID missing");
        const {category, sub_cat_name} = req.body;
        if(!category || !sub_cat_name) return res.status(404).json({error: "Category & Sub-Category names are mandatory"});
        const sub_category = await SubCategory.create({
            user_id: userId,
            category: category,
            sub_cat_name: sub_cat_name
        });
        if(!sub_category) return res.status(404).json({error: "Failed to add sub_cat to the DB"});
        res.status(200).json(sub_category);
    } catch(err){
        res.status(500).json({err: err.message});
    }
}

const deleteSubCategory = async (req, res) => {
    try{
        await dbConnect();
        const deletedSubCat = await SubCategory.findByIdbAndDelete(req.params.id);
        if (!deletedSubCat) return res.status(404).json({error: "Can't delete the sub-category"});
        res.status(200).json(deletedSubCat);
    } catch(err){
        res.status(500).json({error: err.messsage});
    }
}

module.exports = {getAllSubCategory, getSubCategory, createSubCategory, deleteSubCategory}