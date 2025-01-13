const Router = require('express')
const AuthController = require('../controllers/auth-controller')

const router = Router()

router.post('/', AuthController.signin)
router.post('/new_token', AuthController.refresh)

module.exports = router
