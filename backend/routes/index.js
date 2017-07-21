var express = require('express');
var router = express.Router();
// var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

router.get('/test', function (req, res, next) {
  res.send("what the fuck")
})

module.exports = router;
