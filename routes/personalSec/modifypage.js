var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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

/* GET user profile page. */
router.get('/', authenticationMiddleware(), function(req, res, next) {
            res.render('personalSec/modifypage', {
                title: 'Profile',
                name: 'Daily Cate',
                user: req.user,
                imgpath: '../profileimgs/' + req.user.username


            });


});
router.post('/', upload.single('profileimg'), function (req,res,next) {

    //store in database
    var email = req.body.email;
    var oldpassword = req.body.password;
    var desc = req.body.description;
    var pwd = req.body.password1;
    var pwd1 = req.body.password2;
    var name = req.user.username;


    //Form validator
    if(email===''){
        email = req.user.email;
    }
    else{
        req.checkBody('email', 'Email is not valid').isEmail();
    }

    if(desc===''){
        desc = req.user.description;
    }

    console.log(pwd);
    console.log(desc);
    console.log(email);


    test.update_client(name,email,pwd,desc){



});

/* Check user's authentication, if not logged in, redirect user to log in page */
function authenticationMiddleware () {
    return function (req, res, next){
        console.log('user:', req.session.passport.user);

        if (req.isAuthenticated()) {
            return next();
        }else{
            res.redirect('signin');
        }
    }
}


module.exports = router;