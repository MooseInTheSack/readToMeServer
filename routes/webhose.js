var express = require('express');
var router = express.Router();

var webhoseController = require('../controllers/webhoseController');

router.get('/', webhoseController.topStories);
router.get('/topic/:topic', webhoseController.topStoriesByTopic);
router.get('/category/:category', webhoseController.topStoriesByCategory);


module.exports = router;