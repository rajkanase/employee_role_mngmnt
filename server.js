var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var routes = require('./routes/index');
mongoose.Promise = global.Promise;
var app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
var path = require("path");
// Set headers for Cross origin
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        return next();
    }
});

// app.all('/*', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Origin", "http://localhost:8100");  // restrict it to the required domain
//     res.header("Access-Control-Allow-Origin", "*://*/*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization');
//     if (req.method == 'OPTIONS') {
//         res.status(200).end();
//     } else {
//         return next();
//     }
// });
const directory = path.join(__dirname, "/uploads");
app.use("/uploads", express.static(directory));
app.use('/', routes);
app.use(function (req, res, next) {
    res.status(404).json({ status: "Page not found" }).end();
});
//mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });
mongoose.connect(config.mongo.url, { useNewUrlParser: true }, function () { /* dummy function */ })
    .then(() => {
        console.log("connected to employee_role_mngmnt database");
    })
    .catch(err => { // mongoose connection error will be handled here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });
app.listen(3000, function () {
    console.log("Server is running on 3000 port....!")
});
