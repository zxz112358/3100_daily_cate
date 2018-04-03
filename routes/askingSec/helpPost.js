var express = require('express');
var router = express.Router();

var test = require('../test');

router.get('/', function(req, res, next) {
    //console.log("!!!!",decodeURIComponent(req.query.articleId));
    test.select_article(decodeURIComponent(req.query.articleId), function (article) {
        test.select_article_comment(decodeURIComponent(req.query.articleId),function(result1,result2){
            //console.log(result1);//the no. of comments in that article;
            //console.log(result2);//all comments -> result2[i].content
            res.render('exhibitionSec/articlePost', {
                title: 'helpPost',
                name: 'Daily Cate',
                user: req.user,
                article: article,
                comment:result2
            });

        });
        //console.log(article);
    });
});

module.exports = router;
