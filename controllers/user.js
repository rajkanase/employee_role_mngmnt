const User = require("../models/user");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const uuidv4 = require("uuid/v4");

module.exports = () => {
  var user = {};
  user.createUser = (req, res) => {
    console.log(req.body);
    var user1 = new User(req.body);
    User.findOne({ email: req.body.email }, (err, user) => {
      console.log(user);
      if (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err });
      } else if (user) {
        res.status(500).json({ success: false, message: 'User already exist.' });
      } else {
        user1.save((err, newUser) => {
          if (err) {
            console.log(err);
            res.status(500).json({ success: false, message: err });
          } else if (newUser) {
            res.status(200).json({ success: true, message: 'User registered.' });
          }
        })
      }
    })
  }

  user.testFun = (req, res) => {
    res.send('Api works...');
  }

  user.loginUser = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        res.status(500).json({ success: false, message: err.errmsg });
      } else if (!user) {
        res.status(500).json({ success: false, message: 'Email Id Not Found' });
      } else {
        const validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.status(500).json({ success: false, message: 'Invalid Password' });
        } else {
          const token = jwt.sign({ userId: user._id }, config.token.secret, {
            expiresIn: "24h"
          });
          res.json({
            success: true,
            message: "Login Success",
            token: token,
            user: user
          });
        }
      }
    });
  }

  return user;
};
