var express = require('express');
var router = express.Router();

/* GET ingredient page. */
router.get('/', function(req, res, next) {
  res.render('ingredientSec/ingredient_fruits', {
    title: 'Ingredients',
    name: 'Daily Cate',
      user: req.user
  });
});

module.exports = router;
