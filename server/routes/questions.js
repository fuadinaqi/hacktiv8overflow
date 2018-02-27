var express = require('express');
var router = express.Router();
var controllerQuestion = require('../controllers/controllerQuestion')
var middleware = require('../middleware/authLogin')

router.get('/', controllerQuestion.getAll)
router.post('/add', middleware.authLogin, controllerQuestion.create)
router.get('/profile', middleware.authLogin, controllerQuestion.getById)
router.put('/vote/:id', middleware.authLogin, controllerQuestion.vote)
router.put('/:id', middleware.authLogin, controllerQuestion.edit)
router.delete('/:id', middleware.authLogin, controllerQuestion.destroy)

module.exports = router;
