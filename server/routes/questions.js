var express = require('express');
var router = express.Router();
var controllerQuestion = require('../controllers/controllerQuestion')
var middleware = require('../middleware/authLogin')

router.get('/', middleware.authLogin, controllerQuestion.getAll)
router.post('/add', middleware.authLogin, controllerQuestion.create)
router.put('/vote/:id', middleware.authLogin, controllerQuestion.vote)
router.delete('/:id', middleware.authLogin, controllerQuestion.destroy)

module.exports = router;
