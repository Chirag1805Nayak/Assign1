var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/project', (req, res) => {
  res.render('project');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});
router.get('/supportme', (req, res) => {
  res.render('supportme');
});
module.exports = router;
