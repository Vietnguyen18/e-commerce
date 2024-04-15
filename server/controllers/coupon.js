const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

// Create Coupon 
    const createNewCoupon = asyncHandler(async(req, res) => {
        const {name, discount , expiry} = req.body
        if(!name || !discount || !expiry) throw new Error('Missing inputs')
        const response = await Coupon.create({
                ...req.body,
                expiry: Date.now() + + expiry * 24 * 60 * 60 * 1000,
            })
        return res.json({
            success: response ? true : false,
            createCoupon: response ? response : 'Cannot create new Coupon'
        })
    })
// Get Blog 
    const getCoupons = asyncHandler(async(req, res) => {
        const response = await Coupon.find().select('-createdAt -updatedAt')
        return res.json({
            success: response ? true : false,
            getCoupons: response ? response : 'Cannot get Coupons'
        })
    })
//  Update Coupon 
    const updateCoupon = asyncHandler(async(req, res) => {
        const { cid } = req.params
        if(Object.keys(cid).length === 0) throw new Error('Missing inputs')
        if(req.body.expiry) req.body.expiry = Date.now() + + req.body.expiry * 24 * 60 * 60 * 1000
        const response = await Coupon.findByIdAndUpdate(cid, req.body, {new:true})
        return res.json({
            success: response ? true : false,
            updatedCoupon: response ? response : 'Cannot updated Coupon'
        })
    })
// delete Coupon
    const deleteCoupon = asyncHandler(async(req, res) => {
        const { cid } = req.params
        if(Object.keys(cid).length === 0) throw new Error('Missing inputs')
        const response = await Coupon.findByIdAndDelete(cid)
        return res.json({
            success: response ? true : false,
            deletedCoupon: response ? response : 'Cannot deleted Coupon'
        })
    })

module.exports ={
    createNewCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon
}