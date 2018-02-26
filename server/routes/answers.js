var express = require('express');
var router = express.Router();
var controllerAnswer = require('../controllers/controllerAnswer')
var middleware = require('../middleware/authLogin')

router.get('/', controllerAnswer.getAll)
router.put('/:questionId/:id', middleware.authLogin, controllerAnswer.vote)
router.post('/:questionId', middleware.authLogin, controllerAnswer.create)
router.delete('/:id', middleware.authLogin, controllerAnswer.destroy)

module.exports = router;
