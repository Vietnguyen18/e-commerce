const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const {genrateAccessToken,genrateRefreshToken} = require('../middlewares/jwt');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const sendMail = require('../ultils/sendMail');
const crypto = require('crypto');
const product = require('../models/product');
const makeToken = require('uniqid')

//POST
// const register =  asyncHandler(async(req,res)=>{
//     const {email, password, firstname, lastname} = req.body;
//     if (!email || !password || !firstname || !lastname) 
//         return res.status(400).json({
//             success: false,
//             mes: 'Missing inputs'
//         })

//     const user = await User.findOne({email})
//         if(user) 
//             throw new Error('User has existed !!!')
//         else{
//             const newUser = await User.create(req.body)
//             return res.status(200).json({
//                 success: newUser ? true : false,
//                 mes: newUser ? 'Register is successfully. Please go login !' : 'Something went wrong'
//             })
//         }
// });
    const register = asyncHandler(async(req, res) => {
        const {email, password, firstname, lastname, mobile} = req.body;
        if(!email || !password || !firstname || !lastname || !mobile) {
            return res.status(400).json({
                success: false,
                mes: 'Missing inputs'
            })
        }
        const checkMail = await User.findOne({email})
        if(checkMail) throw new Error('Mail has existed')
        else{
            const token = makeToken()
            res.cookie('dataregister', {...req.body, token}, {httpOnly: true, maxAge: 15*60*1000})
            const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng kí của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
            <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click here</a>`
            await sendMail({email, html, subject: 'Hoàn tất đăng kí .....'})
            return res.json({
                success: true,
                mes: 'Please check your email to active account'
            })
        }
    })

// final Register
    const finalRegister = asyncHandler(async(req, res) => {
        const cookie = req.cookies
        const {token} = req.params
        if(!cookie || cookie?.dataregister?.token !== token ) {
            res.clearCookie('dataregister')
            return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
        }
        const newUser = await User.create({
            email: cookie?.dataregister?.email,
            password: cookie?.dataregister?.password,
            mobile: cookie?.dataregister?.mobile,
            firstname: cookie?.dataregister?.firstname,
            lastname: cookie?.dataregister?.lastname,
        })
        res.clearCookie('dataregister')
            if(newUser) return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`)
            else return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
    })
// GET
const login =  asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if (!email || !password ) 
        return res.status(400).json({
            success: false,
            mes: 'Missing inputs'
        })

        //plan object
    const response = await User.findOne({email})
    if(response && await response.isCorrectPassword(password)){
        //tach password va role ra khoi response
        const {password, role, refreshToken , ...userData} = response.toObject()
        const accessToken = genrateAccessToken(response._id,role) //Access Token => xac thuc nguoi dung, phan quyen nguoi dung
        const newRefreshToken = genrateRefreshToken(response._id) // refrech Token => cap moi access token
        // luu refrech token vao database
        await User.findByIdAndUpdate(response._id,{ refreshToken : newRefreshToken },{new: true})
        // luu refrech token vao cookie
        res.cookie('refreshToken', newRefreshToken, {httpOnly: true, maxAge: 7*24*60*60*1000})
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    }
    else{
        throw new Error('Invalid credential !!')
    }
});

// GET
const getCurrent =  asyncHandler(async(req,res)=>{
    const {_id} = req.user
    const user = await User.findById(_id).select('-refreshToken -password')
    return res.status(200).json({
        success: true,
        rs: user ? user : 'User not found'
    })
});

// refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    // lay token tu cookie
    const cookie = req.cookies
        //check xem co token hay khong
        if(!cookie && !cookie.refreshToken) throw new Error(' No Refresh token is cookies ')
        // check han cua token co con hop le
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken})
            return res.status(200).json({
                success: response ? true : false,
                newAccessToken: response ? genrateAccessToken(response._id,response.role) : 'refresh token not matched'
        })
})
// Logout
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if(!cookie && !cookie.refreshToken) throw new Error('No Refresh token in cookie')
    //xoa refresh token o db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken },{ refreshToken: '' },{ new: true }) 
    // xoa refresh token o cookie o trinh duyet
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    })
    return res.status(200).json({
        success: true,
        mes: 'Logout is done'
    })
})

//reset password and send mail OTP
//client gui mall
// Server check email co hop le hay khong => gui mail + kem them link (password change token)
// Client check mail => click link 
// Client gui api kem token
// check token co giong voi token ma server gui mail khong
// Change password 
// Check token co giong voi token ma server gui mail khong
// change password

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query
    if (!email) throw new Error('Missing email')
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. 
    <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html,
        subject: 'Forgot Password'
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success: true,
        rs
    })
})

 // Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error('Missing imputs')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Updated password' : 'Something went wrong'
    })
})

// Get User
 const getUser = asyncHandler(async (req, res)=>{
    // Filtering
  const queries = { ...req.query }; // Destructure and copy query object
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((e) => delete queries[e]);

  // Format operators for Mongoose syntax
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (match) => `$${match}`
  );
  const formattedQueries = JSON.parse(queryString);

  // Filter User
  if (queries?.name)
    formattedQueries.name = { $regex: queries.name, $options: "i" };
  if( req.query.q){
        delete formattedQueries.q
        formattedQueries['$or'] = [
            {firstname: {$regex: req.query.q, $options: 'i'}},
            {lastname: {$regex: req.query.q, $options: 'i'}},
            {email: {$regex: req.query.q, $options: 'i'}}
        ]
  }
  console.log(formattedQueries);
  let queryCommand = User.find(formattedQueries);

  if(req.query.q){
    formattedQueries['$or'] = [
            {name: { $regex: queries.q, $options: "i"}},
            {email: { $regex: queries.q, $options: "i"}},
    ]
  }
  console.log(formattedQueries);
  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }


  
  // Pagination
  //limit: số object lấy về 1 gọi api
  // skip: 2
  // 1 2 3 ... 10 (sẽ bỏ 2 số đầu)
  const page = +req.query.page || 1;
  const limit = +req.query.limit 
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  // Execute query
  // Số lượng sp thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  try {
    const [users, counts] = await Promise.all([
      queryCommand.then((response) => response),
      User.find(formattedQueries).countDocuments(),
    ]);

    res.status(200).json({
      success: users.length > 0,
      counts,
      users,
    });
  } catch (err) {
    console.error(err.message); // Log the error for debugging
    res.status(500).json({ success: false, message: "Failed to get user" });
  }
 })
 //delete user
 const deleteUser = asyncHandler(async (req, res)=>{
    const { uid } = req.params
    // if( !_id ) throw new Error('Missing inputs')
    const response =  await User.findByIdAndDelete( uid )
    return res.status(200).json({
        success: response  ? true : false,
        mes: response ? `User with email ${response.email} delete` : 'No user delete'
    })
 })
 //update user
 const updateUser = asyncHandler(async (req, res)=>{
    const { _id } = req.user
    if( !_id || Object.keys(req.body).length === 0 ) throw new Error('Missing input')
    const response =  await User.findByIdAndUpdate( _id, req.body, {new: true} ).select('-refreshToken -password -role')
    return res.status(200).json({
        success: response  ? true : false,
        updatedUser: response ? response : 'Some thing went wrong'
    })
 })

 //update user by admin 
 const updateUserByAdmin = asyncHandler(async (req, res)=>{
    const { uid } = req.params
    if(Object.keys(req.body).length === 0 ) throw new Error('Missing inputs')
    const response =  await User.findByIdAndUpdate( uid, req.body, {new: true} ).select(' -refreshToken -password -role')
    return res.status(200).json({
        success: response  ? true : false,
        mes: response ? 'Updated' : 'Some thing went wrong'
    })
 })

 //update address user
 const updateAddressUser = asyncHandler(async (req, res)=>{
    const { _id } = req.user
    if(!req.body.address) throw new Error('Missing inputs')
    const response =  await User.findByIdAndUpdate(_id, {$push: {address: req.body.address}}, {new: true} ).select(' -refreshToken -password -role')
    return res.status(200).json({
        success: response  ? true : false,
        updatedAddressUser: response ? response : 'Some thing went wrong'
    })
 })
 //update cart
 const updateCart = asyncHandler(async (req, res)=>{
    const { _id } = req.user
    const { pid, quantity, color} = req.body
    if(!pid || !quantity || !color) throw new Error('Missing inputs')
    const user = await User.findById(_id).select('cart')
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid)
       //
         if(alreadyProduct){
            if(alreadyProduct.color === color) {
                const response = await User.updateOne({cart: {$elemMatch: alreadyProduct}},{$set: {"cart.$.quantity": quantity}},{new: true})
                    return res.status(200).json({
                        success: response  ? true : false,
                        updateCart: response ? response : 'Some thing went wrong'
                    })
                    
                }else{
                const response = await User.findByIdAndUpdate(_id,{$push: {cart: {product: pid, quantity, color}}},{new: true})
                return res.status(200).json({
                success: response  ? true : false,
                updateCart: response ? response : 'Some thing went wrong'
            }) 
            }
         }else{
            const response = await User.findByIdAndUpdate(_id,{$push: {cart: {product: pid, quantity, color}}},{new: true})
            return res.status(200).json({
                success: response  ? true : false,
                updateCart: response ? response : 'Some thing went wrong'
            })
         }
 })

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUser,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateAddressUser,
    updateCart,
    finalRegister
}