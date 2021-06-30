var express = require('express');
var router = express.Router();

var mediumController = require('../controllers/mediumController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', mediumController.mccallisaiahFeed);

module.exports = router;