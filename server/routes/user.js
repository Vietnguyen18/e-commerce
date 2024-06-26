const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", ctrls.register);
router.get("/finalregister/:token", ctrls.finalRegister);
router.post("/login", ctrls.login);
router.get("/current", verifyAccessToken, ctrls.getCurrent);
router.post("/refreshtoken", ctrls.refreshAccessToken);
router.get("/logout", ctrls.logout);
router.get("/forgotpassword", ctrls.forgotPassword);
router.put("/resetpassword", ctrls.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUser);
router.put("/current", [verifyAccessToken], ctrls.updateUser);
router.put("/address", [verifyAccessToken], ctrls.updateAddressUser);
router.put("/cart", [verifyAccessToken], ctrls.updateCart);
//pagram
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin);
router.delete("/:uid", [verifyAccessToken, isAdmin], ctrls.deleteUser);

module.exports = router;

//CRUD
// Create - Read - Update - Delete
// Post - Get - Put - delete

//Create: (Post) + Put - body
//Get + Delete - query // kieu ?
