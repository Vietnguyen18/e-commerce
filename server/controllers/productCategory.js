const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

// Create Category
    const createCategory = asyncHandler(async(req, res) => {
        const response = await ProductCategory.create(req.body)
        return res.json({
            success: response ? true : false,
            createCategory: response ? response : 'Cannot create new product-category'
        })
    })
// get Category
    const getCategory = asyncHandler(async(req, res) => {
        const response = await ProductCategory.find().select('title _id')
        return res.json({
            success: response ? true : false,
            productCategories: response ? response : 'Cannot get product-category'
        })
    })
//  update Category
    const updateCategory = asyncHandler(async(req, res) => {
        const {pcid} = req.params
        const response = await ProductCategory.findByIdAndUpdate(pcid, req.body ,{new: true})
        return res.json({
            success: response ? true : false,
            updatedCategories: response ? response : 'Cannot update product-category'
        })
    })
//  delete Category
    const deleteCategory = asyncHandler(async(req, res) => {
        const {pcid} = req.params
        const response = await ProductCategory.findByIdAndDelete(pcid)
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