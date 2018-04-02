var express = require('express');
var router = express.Router();

var test = require('../test');

/* GET exhibition page. */
router.get('/', function(req, res, next) {
    console.log(decodeURIComponent(req.query.articleId));
    test.select_article(decodeURIComponent(req.query.articleId), function (article) {
        res.render('askingSec/helpPost', {
            title: 'helpPost',
            name: 'Daily Cate',
            user: req.user,
            article: article
        });
        console.log(article);
    });
});

module.exports = router;
