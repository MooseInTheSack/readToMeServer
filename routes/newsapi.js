var express = require('express');
var router = express.Router();

var newsApiController = require('../controllers/newsApiController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', newsApiController.topStories);
router.get('/wsj', newsApiController.topWSJStories)

module.exports = router;