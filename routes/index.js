var express = require('express');
var router = express.Router();

var userController = require('../controllers/user')();
var roleController = require('../controllers/role')();
var employeeController = require('../controllers/employee')();
const multer = require('multer');
// const multerS3 = require('multer-s3');
const config = require('../config/config');

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Express'
    });
});


var uploadProfileImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/profile')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg')
        }
    })
});

var uploadProfileImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/profile')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg')
        }
    })
});

//test api
router.get('/api/test', userController.testFun);

// from employee controller
router.post("/api/createemployee", uploadProfileImage.single('profile'), employeeController.createEmployee);
router.post("/api/updateemployee", uploadProfileImage.single('profile'), employeeController.updateEmployee);
router.get('/api/getemployees', employeeController.getEmployees);
router.get('/api/getsingleemployee/:id', employeeController.getSingleEmployee);
//from user controller
router.post('/api/createuser', userController.createUser);
router.post('/api/loginuser', userController.loginUser);


//from role controller
router.post('/api/createrole', roleController.createRole);
router.post('/api/updaterole', roleController.updateRole);
router.get('/api/getroles', roleController.getRoles);
router.get('/api/getsinglerole/:id', roleController.getSingleRole);

module.exports = router;