var express = require('express');
var router = express.Router();

/* GET sign in page. */
router.get('/', function(req, res, next) {
    req.logout();
    req.session.destroy(function () {
        res.clearCookie('connect.sid');

        res.render('personalSec/signout', {
            title: 'Sign Out',
            name: 'Daily Cate',
            message:'You are now logged out.',
            user: req.user
        });
    });
});

router.post('/', function (req, res, next) {
    //search handling
    console.log(req.body.searchname);
    var searchname = encodeURIComponent(req.body.searchname);
    res.redirect('../personalSec/search?searchname=' + searchname);
});

module.exports = router;
