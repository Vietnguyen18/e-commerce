const router = require('express').Router();
const ctrls = require('../controllers/blogCategory')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

    
    router.post('/',[verifyAccessToken, isAdmin], ctrls.createCategory )
    router.get('/', ctrls.getCategory )
    //param
    router.put('/:bcid',[verifyAccessToken, isAdmin], ctrls.updateCategory )
    router.delete('/:bcid',[verifyAccessToken, isAdmin], ctrls.deleteCategory )


module.exports = router;

//CRUD 
// Create - Read - Update - Delete
// Post - Get - Put - delete 

//Create: (Post) + Put - body
//Get + Delete - query // kieu ?