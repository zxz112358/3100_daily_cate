var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('homepage/homepage', {
        title: 'Daily Cate',
        name:'Daily Cate',
        user: req.user
    });
});

module.exports = router;
console.log("this is the home page!");