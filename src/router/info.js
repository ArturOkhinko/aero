const Router = require('express')
const AuthController = require('../controllers/auth-controller')

const router = Router()

router.get('/', AuthController.info)

module.exports = router
