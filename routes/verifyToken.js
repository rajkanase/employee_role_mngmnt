const jwt = require("jsonwebtoken");
var config = require("../config/config");
const secret = require("crypto")
    .randomBytes(256)
    .toString("hex");
module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    console.log('in tkn');
    
    if (!token) {
        res.status(500).json({ success: false, message: 'No token provided' });
    } else {
        jwt.verify(token, config.token.secret, (err, decoded) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Token Invalid:' + err });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
};