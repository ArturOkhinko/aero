const Router = require('express')
const AuthController = require('../controllers/auth-controller')
const userContactValidation = require('../validators/validator')
const { body } = require('express-validator')

const router = Router()

router.post('/',
    userContactValidation(),
    body('password').isLength({min: 3, max: 35}),
    AuthController.signup
)

module.exports = router
