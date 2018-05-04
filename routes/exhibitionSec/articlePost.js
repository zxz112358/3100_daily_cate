var express = require('express');
var router = express.Router();

var test = require('../test');

/* GET exhibition page. */
router.get('/', function(req, res, next) {
    /* find article from db */
    test.select_article(req.query.articleId, function (article) {
        /* find comments of the article in db */
        test.select_article_comment(req.query.articleId,function(result1,result2){
            if(req.user) {
                /* render the page */
                test.check_whether_like_article(req.user.username, req.query.articleId, function (liked) {
                    res.render('exhibitionSec/articlePost', {
                        title: 'articlePost',
                        name: 'Daily Cate',
                        user: req.user,
                        article: article,
                        comment: result2,
                        liked: liked
                    });
                    console.log('liked: ', liked);
                });
            }else {
                res.redirect('/');
            }
            });
        //console.log(article);
    });
});

/* handle POST requests */
router.post('/', function(req, res, next) {
    var comment = req.body.comment;
    var like_operation = req.body.operation;

    var authorname = req.body.author;

    console.log('comment: ', comment, 'like_ope: ', like_operation, 'au:', authorname);

    if (comment || like_operation || authorname) {
        if (comment) {
            /* submit comment */
            test.count_comment(function (commentNum) {
                test.insert_comment(commentNum + 1, req.user.username, req.body.comment, req.query.articleId);
            });
            res.redirect('back');
        }
        /* like & unlike operation */
        console.log('like operation: ', like_operation);
        if (like_operation === 'like') {
            test.like_article(req.query.articleId, req.user.username);
            res.redirect('back');
        } else if (like_operation === 'unlike') {
            test.unlike(req.user.username, req.query.articleId);
            res.redirect('back');
        }
        /* check author profile */
        if (authorname){
            var username = encodeURIComponent(authorname);
            res.redirect('../personalSec/userpostpage?username=' + username);
        }
    }else {
        //search handling
        console.log(req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    }
});

module.exports = router;


