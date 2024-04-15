const router = require('express').Router();
const ctrls = require('../controllers/blog')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')


router.post('/',[verifyAccessToken,isAdmin], ctrls.createBlog)
router.get('/', ctrls.getBlogs)
//pagam
router.put('/:bid',[verifyAccessToken,isAdmin], ctrls.updateBlog)
router.delete('/:bid',[verifyAccessToken,isAdmin], ctrls.deleteBlog)
router.put('/likes/:bid',[verifyAccessToken], ctrls.likeBlog)
router.put('/dislikes/:bid',[verifyAccessToken], ctrls.disLikeBlog)
router.put('/images/:bid',[verifyAccessToken], uploader.single('images') ,ctrls.uploadImagesBlog)
router.get('/one/:bid', ctrls.getBlog)

module.exports = router;    