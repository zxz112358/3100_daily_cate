var express = require('express');
var router = express.Router();

var test = require('../test');

router.get('/', function(req, res, next) {
    test.select_article(decodeURIComponent(req.query.articleId), function (article) {
        test.select_article_comment(decodeURIComponent(req.query.articleId),function(result1,result2){
            test.check_whether_like_article(req.user.username, req.query.articleId, function (liked) {
                res.render('askingSec/helpPost', {
                    title: 'helpPost',
                    name: 'Daily Cate',
                    user: req.user,
                    article: article,
                    comment:result2,
                    liked:liked
                });
            });
        });
    });
});

router.post('/', function(req, res, next) {
    var comment = req.body.comment;
    var like_operation = req.body.operation;
    if (comment || like_operation) {
        if (comment) {
            //submit comment
            test.count_comment(function (commentNum) {
                test.insert_comment(commentNum + 1, req.user.username, req.body.comment, req.query.articleId);
            });
        }
        //like & unlike
        console.log('like operation: ', like_operation);
        if (like_operation === 'like') {
            test.like_article(req.query.articleId, req.user.username);
        } else if (like_operation === 'unlike') {
            test.unlike(req.user.username, req.query.articleId)
        }
        res.redirect('back');
    }else{
        //search handling
        console.log(req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    }
});

module.exports = router;
