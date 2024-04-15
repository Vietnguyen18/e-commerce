const router = require('express').Router();
const ctrls = require('../controllers/product')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const uploader = require('../config/cloudinary.config')

    router.post('/',[verifyAccessToken,isAdmin], ctrls.createProduct)
    router.get('/', ctrls.getProducts)
    router.put('/ratings',[verifyAccessToken], ctrls.ratings)
    
    
    // param
    router.get('/:pid', ctrls.getProduct)
    router.put('/:pid',[verifyAccessToken,isAdmin], ctrls.updateProduct)
    router.delete('/:pid',[verifyAccessToken,isAdmin], ctrls.deleteProduct)
    router.put('/uploadimage/:pid',[verifyAccessToken,isAdmin],uploader.array('images', 10), ctrls.uploadImagesProduct)
module.exports = router;

//CRUD 
// Create - Read - Update - Delete
// Post - Get - Put - delete 

//Create: (Post) + Put - body
//Get + Delete - query // kieu ?