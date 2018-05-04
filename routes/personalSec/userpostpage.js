var express = require('express');
var router = express.Router();
var test = require('../test');
var connection = test.connection;

/* GET home page. */
router.get('/', function(req, res, next) {
    var checked_username = req.query.username;
    test.select_user(checked_username, function (checked_user) {
        test.select_all_client_article(checked_username, function (length, article) {
            test.check_whether_follow(req.user.username,checked_username,function(result){
                res.render('personalSec/userpostpage', {
                    title: 'Home',
                    name:'Daily Cate',
                    user: req.user,
                    checked_user: checked_user,
                    article: article,
                    followed:result
                });
            });

        })
    });
});

/* Handle POST requests: follow & unfollow user; enter clicked article; search */
router.post('/', function (req, res, next) {
    var result = req.body.result;
    var fo_operation = req.body.follow_operation;

    console.log('fo: ', fo_operation);

    if (fo_operation){
        //follow operation
        if (fo_operation === 'follow'){
            test.follow(req.user.username, req.query.username);
            res.redirect('back');
        }else if (fo_operation === 'unfollow'){
            test.unfollow(req.user.username, req.query.username);
            res.redirect('back');
        }
    }else if (result) {
        //enter article
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
