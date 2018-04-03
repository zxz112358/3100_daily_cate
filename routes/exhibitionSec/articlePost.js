var express = require('express');
var router = express.Router();

var test = require('../test');

/* GET exhibition page. */
router.get('/', function(req, res, next) {
    console.log(req.query.articleId);
    test.select_article(req.query.articleId, function (article) {
        res.render('exhibitionSec/articlePost', {
            title: 'articlePost',
            name: 'Daily Cate',
            user: req.user,
            article: article
        });
        console.log(article);
    });
});

module.exports = router;
