const userService = require('../services/auth-service')
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error")

const maxAgeRefreshToken = 30 * 24 * 60 * 60 * 1000
const REFRESH_TOKEN = 'refreshToken'

class AuthController {
    async signup(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.errors))
            }

            const userContact = req.body.id
            const { password } = req.body
            const { deviceId } = req.cookies

            const userData = await userService.signup(userContact, password, deviceId)
            res.cookie(REFRESH_TOKEN, userData.refreshToken, { maxAge: maxAgeRefreshToken, httpOnly: true })
            res.json(userData)
        }
        catch(e) {
            next(e)
        }
    }
    async signin(req, res, next) {
        try {
            const { id, password } = req.body
            const { deviceId } = req.cookies
            const userData = await userService.signin(id, password, deviceId)
            res.cookie(REFRESH_TOKEN, userData.refreshToken, { maxAge: maxAgeRefreshToken, httpOnly: true })
            res.json(userData)
        }
        catch(e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            await userService.logout(refreshToken)
            res.clearCookie(REFRESH_TOKEN)
            res.sendStatus(200)
        }
        catch(e) {
            next(e)
        }
    }
}

module.exports = new AuthController()
