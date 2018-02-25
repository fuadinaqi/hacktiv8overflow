var express = require('express');
var router = express.Router();
var controllerUser = require('../controllers/controllerUser')
var middleware = require('../middleware/authLogin')

router.get('/', middleware.authLogin, controllerUser.getAll)
router.post('/signup', controllerUser.signup)
router.post('/signin', controllerUser.signin)
router.put('/:id', middleware.authLogin, controllerUser.edit)
router.delete('/:id', middleware.authLogin, controllerUser.destroy)

module.exports = router;
