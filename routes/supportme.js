var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('supportme', { title: 'Support ME' });
});

module.exports = router;
