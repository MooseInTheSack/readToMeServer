var express = require('express');
var router = express.Router();

var fourChanController = require('../controllers/fourChanController');

router.get('/pol', fourChanController.topTenThreadsPol);
router.get('/fit', fourChanController.topTenThreadsFit);
router.get('/int', fourChanController.topTenThreadsInt);
router.get('/v', fourChanController.topTenThreadsV);
router.get('/biz', fourChanController.topTenThreadsBiz);

module.exports = router;