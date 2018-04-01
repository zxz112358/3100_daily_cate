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

module.exports = router;
