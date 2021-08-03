var express = require('express');
var router = express.Router();

var gnewsController = require('../controllers/gnewsController');

router.get('/', gnewsController.getTopHeadlines);

module.exports = router;