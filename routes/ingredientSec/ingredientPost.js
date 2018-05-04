var express = require('express');
var router = express.Router();

var test = require('../test');

/* GET exhibition page. */
router.get('/', function(req, res, next) {
    /* find article from db */
    test.select_article(decodeURIComponent(req.query.articleId), function (article) {
        /* find comments of the article in db */
        test.select_article_comment(decodeURIComponent(req.query.articleId),function(result1,result2){
            if(req.user) {
                /* render the page */
                test.check_whether_like_article(req.user.username, req.query.articleId, function (liked) {
                    res.render('ingredientSec/ingredientPost', {
                        title: 'ingredientPost',
                        name: 'Daily Cate',
                        user: req.user,
                        article: article,
                        comment: result2,
                        liked: liked
                    });
                    console.log(decodeURIComponent(req.query.articleId));
                    console.log('comments: ', result2);
                });
            }else {
                res.redirect('/');
            }
        });
    });
});

/* handle POST requests: posts comments; search */
router.post('/', function(req, res, next) {
    if (req.body.comment) {
        //post comments
        test.count_comment(function (commentNum) {
            test.insert_comment(commentNum + 1, req.user.username, req.body.comment, req.query.articleId);
        });
    }else{
        //search handling
        console.log(req.body.searchname);
        var searchname = encodeURIComponent(req.body.searchname);
        res.redirect('../personalSec/search?searchname=' + searchname);
    }
    res.redirect('back');
});

module.exports = router;


