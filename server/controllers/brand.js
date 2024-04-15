const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

// Create Blog Category
    const createNewBrand = asyncHandler(async(req, res) => {
        const response = await Brand.create(req.body)
        return res.json({
            success: response ? true : false,
            createBrand: response ? response : 'Cannot create New Brand'
        })
    })
// get Blog Category
    const getBrands = asyncHandler(async(req, res) => {
        const response = await Brand.find()
        return res.json({
            success: response ? true : false,
            brands: response ? response : 'Cannot get Brand'
        })
    })
//  update Blog Category
    const updateBrand = asyncHandler(async(req, res) => {
        const {brid} = req.params
        const response = await Brand.findByIdAndUpdate(brid, req.body ,{new: true})
        return res.json({
            success: response ? true : false,
            updatedBrands: response ? response : 'Cannot update Brand'
        })
    })
//  delete Blog Category
    const deleteBrand = asyncHandler(async(req, res) => {
        const {brid} = req.params
        const response = await Brand.findByIdAndDelete(brid)
        return res.json({
            success: response ? true : false,
            deletedBrands: response ? response : 'Cannot delete Brand'
        })
    })



    module.exports = {
        createNewBrand,
        getBrands,
        updateBrand,
        deleteBrand
    }