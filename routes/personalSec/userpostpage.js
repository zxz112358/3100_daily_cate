var express = require('express');
var router = express.Router();
var test = require('../test');
var connection = test.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
    var checked_username = req.query.username;
    test.select_user(checked_username, function (checked_user) {
        test.select_all_client_article(checked_username, function (length, article) {
            res.render('personalSec/userpostpage', {
                title: 'Home',
                name:'Daily Cate',
                user: req.user,
                checked_user: checked_user,
                article: article
            });
        })
    });
});

router.post('/', function (req, res, next) {
    var result = req.body.result;
    if (result) {
        var postID = encodeURIComponent(result);
        res.redirect('../exhibitionSec/articlePost?articleId=' + postID);
    }else{
        //search handling
        console.log(req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    }
});


module.exports = router;
