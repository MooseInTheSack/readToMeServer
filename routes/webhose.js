var express = require('express');
var router = express.Router();

var webhoseController = require('../controllers/webhoseController');

router.get('/', webhoseController.topStories);

module.exports = router;