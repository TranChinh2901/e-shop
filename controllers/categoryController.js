const categoryModel = require("../models/categoryModel")
const slugify = require("slugify")


const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body
        if(!name) {
            return res.status(401).send({message:'name is required'})
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: 'Category already exists',
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: ' new Category created',
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in category'
        })
    }
}


//update category
const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(
            id,
            {name, slug: slugify(name) }, 
            {new: true}
        );
        res.status(200).send({
            success: true,
            message: "category updated successfully",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while update category'
        })
    }
}

//get all
const categoryController = async (req, res) => {
try {
    const category = await categoryModel.find({});
    res.status(200).send({
        success: true,
        message: "all categories list",
        category,
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success: false,
        error,
        message: 'error while getting all categories'
    })
}
}

//single category
const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            message: 'get single category successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false, 
            error,
            message: 'Error while getting single category'
        })
    }
}


const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
          success: true,
          message: "Category Deleted Successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while deleting category",
          error,
        })
    }
}

module.exports = { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController };
