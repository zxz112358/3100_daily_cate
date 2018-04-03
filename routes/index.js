var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());

  res.render('index', {
    title: 'Welcome to Daily Cate!',
    name:'Daily Cate',
    user: req.user
  });
});

router.post('/', function (req, res, next) {
    //search handling
    console.log(req.body.searchname);
    var searchname = encodeURIComponent(req.body.searchname);
    res.redirect('../personalSec/search?searchname=' + searchname);
});

module.exports = router;
