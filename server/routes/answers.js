var express = require('express');
var router = express.Router();
var controllerAnswer = require('../controllers/controllerAnswer')

router.get('/', controllerAnswer.getAll)

module.exports = router;
