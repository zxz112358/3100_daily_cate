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
        cb(null, String(req.user.username));
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
                imgpath: '../profileimgs/' + req.user.username,
                modify_message: req.flash('modify message'),


            });

});
router.post('/', upload.single('profileimg'), function (req,res,next) {

    //store in database
    var email = req.body.email;
    var oldpassword = req.body.password;
    var desc = req.body.description;
    var pwd = req.body.password1;
    var pwd1 = req.body.password2;

    test.select_user(req.user.username,function(user){
        if (user===false){
            console.log("no such person");
        }
        //get user password


        if(pwd===''&&(pwd1==='')&&(oldpassword==='')){//if no change in password
        //--------check email format
            pwd=user.password;
            if(email===''){
                email = req.user.email;
            }
            else{
                req.checkBody('email', 'Email is not valid').isEmail();
            }
        //--------check if any change in description,if no, return original
            if(desc===''){
                desc = user.description;
            }
        //--------update client info
            test.update_client(user.username,email,pwd,desc,function(result){
                if(result===true) {
                    res.redirect('signout');
                }
            });
        }
        else{//if change password
        //---------if old password verified
            if(oldpassword===user.password){
            //--------if new password confirm fail(confirm a different one)
                if(pwd!==pwd1){
                    console.log('2');
                    req.flash('modify message','You have different new password input!');
                    res.redirect('modifypage');
                }
            //--------if no new password input
                else if((pwd==='')&&(pwd1==='')){
                    console.log('3');
                    req.flash('modify message','Please input your new password!');
                    res.redirect('modifypage')
                }
            //--------new password confirmed
                else{
                //------check email changes,if no return original
                    if(email===''){
                        email = user.email;
                    }
                //------if email changes,check format
                    else{
                        req.checkBody('email', 'Email is not valid').isEmail();
                    }
                //------check description changes,if no return original
                    if(desc==='') {
                        desc = user.description;
                    }
                //------update client info
                    test.update_client(user.username,email,pwd,desc,function(result){
                        if(result===true) {
                            console.log(result);
                            res.redirect('signout');
                        }
                    });
                }
            }
        //-------if old password not verified
            else{
                console.log('1');
                req.flash('modify message','Wrong password!');
                res.redirect('modifypage');

            }
        }

    });
    //Form validator
    if (!(email || oldpassword || desc || pwd || pwd1)){
        //search handling
        console.log(req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    }

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