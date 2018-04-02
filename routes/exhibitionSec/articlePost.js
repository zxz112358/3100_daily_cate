var express = require('express');
var router = express.Router();

/* GET exhibition page. */
router.get('/', function(req, res, next) {
    res.render('exhibitionSec/articlePost', {
        title: 'Post 1',
        name:'Daily Cate',
        author:'XXX',
        user: req.user
    });
});

module.exports = router;
