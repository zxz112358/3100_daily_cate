var express = require('express');
var router = express.Router();

/* GET helpPost page. */
router.get('/', function(req, res, next) {
    res.render('askingSec/helpPost', {
        title: 'Help Post',
        name: 'Daily Cate',
        user: req.user
    });
});

module.exports = router;
