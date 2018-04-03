var express = require('express');
var router = express.Router();

var test = require('../test');

/* GET exhibition page. */
router.get('/', function(req, res, next) {
    test.select_article(decodeURIComponent(req.query.articleId), function (article) {
        test.select_article_comment(decodeURIComponent(req.query.articleId),function(result1,result2){
            test.check_whether_like_article(req.user.username, req.query.articleId, function (liked) {
                res.render('ingredientSec/ingredientPost', {
                    title: 'ingredientPost',
                    name: 'Daily Cate',
                    user: req.user,
                    article: article,
                    comment:result2,
                    liked:liked
                });
                console.log(decodeURIComponent(req.query.articleId));
                console.log('comments: ', result2);
            });
        });
    });
});

router.post('/', function(req, res, next) {
    var comment = req.body.comment;

    test.count_comment(function(commentNum){
        test.insert_comment(commentNum+1, req.user.username, req.body.comment, req.query.articleId);
    });

    res.redirect('back');
});

module.exports = router;


