const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

// Create Blog 
    const createBlog = asyncHandler(async(req, res) => {
        const {title, description , category} = req.body
        if(!title || !description || !category) throw new Error('Missing inputs')
        const response = await Blog.create(req.body)
        return res.json({
            success: response ? true : false,
            createBlog: response ? response : 'Cannot create new Blog'
        })
    })
    // get Blog 
    const getBlogs = asyncHandler(async(req, res) => {
        const response = await Blog.find().select()
        return res.json({
            success: response ? true : false,
            productCategories: response ? response : 'Cannot get Blog'
        })
    })
// Update Blog 
    const updateBlog = asyncHandler(async(req, res) => {
        const { bid } = req.params
        if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
        const response = await Blog.findByIdAndUpdate(bid, req.body,{new: true})
        return res.json({
            success: response ? true : false,
            updatedBlog: response ? response : 'Cannot updated Blog'
        })
    })
// delete Blog 
    const deleteBlog = asyncHandler(async(req, res) => {
        const { bid } = req.params
        const response = await Blog.findByIdAndDelete(bid)
        return res.json({
            success: response ? true : false,
            updatedBlog: response ? response : 'Cannot Delete Blog'
        })
    })

    /**
     * Khi người dùng like một bài blog
     * 1. Check người dùng đó trước đó có dislike hay không => bỏ dislike
     * 2. Check xem người đó trước đó có like hay không => bỏ like / thêm like
     * 
     * 2 lenh
     * pull - keo ra
     * push -dua len
     */

       // Like
        const likeBlog = asyncHandler(async(req,res) => {
            const { _id} = req.user
            const { bid } = req.params
            if(!bid) throw new Error('Missing inputs')
            const blog = await Blog.findById(bid)
            const alreadyDisLiked = blog?.disLikes.find(el => el.id.toString() === _id)
            if(alreadyDisLiked) {
                const response = await Blog.findByIdAndUpdate(bid,{$pull: {dislikes: _id}}, {new: true})
                return res.json({
                    success: response ? true : false,
                    rs: response
                })
            }
            // hoan doi like va  dislike
                const isLiked = blog?.likes?.find(el => el.toString() === _id)
                if(isLiked){
                    const response = await Blog.findByIdAndUpdate(bid,{$pull: {likes: _id}}, {new: true})
                    return res.json({
                        success: response ? true : false,
                        rs: response
                    })
                }else{
                    const response = await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}},{new: true})
                    return res.json({
                        success: response ? true : false,
                        rs: response
                    })
                }
        })
       // Dislike
        const disLikeBlog = asyncHandler(async(req,res) => {
            const { _id} = req.user
            const { bid } = req.params
            if(!bid) throw new Error('Missing inputs')
            const blog = await Blog.findById(bid)
            const alreadyLiked = blog?.likes?.find(el => el.id.toString() === _id)
            if(alreadyLiked) {
                const response = await Blog.findByIdAndUpdate(bid,{$pull: {likes: _id}}, {new: true})
                return res.json({
                    success: response ? true : false,
                    rs: response
                })
            }
            // hoan doi like va  dislike
                const isDisLiked = blog?.disLikes?.find(el => el.toString() === _id)
                if(isDisLiked){
                    const response = await Blog.findByIdAndUpdate(bid,{$pull: {disLikes: _id}}, {new: true})
                    return res.json({
                        success: response ? true : false,
                        rs: response
                    })
                }else{
                    const response = await Blog.findByIdAndUpdate(bid, {$push: {disLikes: _id}},{new: true})
                    return res.json({
                        success: response ? true : false,
                        rs: response
                    })
                }
        })

    // lay thong tin nguoi like va dislike
    const excludedFields = ' -refreshToken -password -role -createdAt -updatedAt -'
        const getBlog = asyncHandler(async(req, res) => {
            const { bid } = req.params
            // cap nhat luot view 
            const blog = await Blog.findByIdAndUpdate(bid, {$inc: {numberViews: 1}},{new: true})
                .populate('likes', 'firstname lastname email')
                .populate('disLikes', 'firstname lastname email')
            return res.json({
                success: blog ? true : false,
                rs: blog
            })
        })
    // Images
    const uploadImagesBlog = asyncHandler(async(req,res)=> {
        const {bid} = req.params
        if(!req.file) throw new Error('Missing inputs')
        const response = await Blog.findByIdAndUpdate(bid,{images: req.file.path},{new:true})
        console.log(req.response);
        return res.status(200).json({
            status: true ? true : false,
            uploadImagesBlog: response ? response : 'Cannot uploat images blog'
        })
    })

    


module.exports ={
    createBlog,
    updateBlog,
    getBlogs,
    deleteBlog,
    likeBlog,
    disLikeBlog,
    getBlog,
    uploadImagesBlog
}