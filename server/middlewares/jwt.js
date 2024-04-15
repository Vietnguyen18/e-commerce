const jwt = require('jsonwebtoken');

const genrateAccessToken = (uid, role) => jwt.sign({ _id: uid, role}, process.env.JWT_SECRET, {expiresIn: '3d'});
const genrateRefreshToken = (uid) => jwt.sign({ _id: uid}, process.env.JWT_SECRET, {expiresIn: '7d'});


module.exports = {
    genrateAccessToken,
    genrateRefreshToken
}