const Router = require('express')
const AuthController = require('../controllers/auth-controller')

const router = Router()

router.post('/', AuthController.signin)

module.exports = router