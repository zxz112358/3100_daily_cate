var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profileimgs/');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name);
    }
});
var upload = multer({ storage: storage });

var test = require('../test');
var connection = test.connection;

/* GET sign up page. */
router.get('/', function(req, res, next) {
    res.render('personalSec/signup', {
        title: 'Sign Up',
        name: 'Daily Cate',
        errors: undefined,
        user: req.user
    });
});

router.post('/', upload.single('profileimg'), function (req,res,next) {

    //store in database
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var description = req.body.description;

    //Form validator
    req.checkBody('name', 'User name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('password2', 'Password does not match').equals(req.body.password);

    //Handle profile img
    if (req.file){
        var profileimg = req.body.name;
    } else {
        var profileimg = 'default';
    }

    //Check errors
    var errors = req.validationErrors();

    if (errors){
        console.log(errors);
        res.render('personalSec/signup', {
            title: 'Sign Up',
            name: 'Daily Cate',
            errors: errors
        });
    }else {
        test.insert_client(name,email,password,description);

        req.flash('signup_success', 'You are now registered and can log in!');
        res.redirect('signin');
    }
});

module.exports = router;
