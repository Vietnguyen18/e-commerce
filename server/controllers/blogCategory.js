const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')

// Create Blog Category
    const createCategory = asyncHandler(async(req, res) => {
        const response = await BlogCategory.create(req.body)
        return res.json({
            success: response ? true : false,
            createCategory: response ? response : 'Cannot create new product-category'
        })
    })
// get Blog Category
    const getCategory = asyncHandler(async(req, res) => {
        const response = await BlogCategory.find().select('title _id')
        return res.json({
            success: response ? true : false,
            productCategories: response ? response : 'Cannot get product-category'
        })
    })
//  update Blog Category
    const updateCategory = asyncHandler(async(req, res) => {
        const {bcid} = req.params
        const response = await BlogCategory.findByIdAndUpdate(bcid, req.body ,{new: true})
        return res.json({
            success: response ? true : false,
            updatedCategories: response ? response : 'Cannot update product-category'
        })
    })
//  delete Blog Category
    const deleteCategory = asyncHandler(async(req, res) => {
        const {bcid} = req.params
        const response = await BlogCategory.findByIdAndDelete(bcid)
        return res.json({
            success: response ? true : false,
            deletedCategories: response ? response : 'Cannot delete product-category'
        })
    })



    module.exports = {
        createCategory,
        getCategory,
        updateCategory,
        deleteCategory
    }