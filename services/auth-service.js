const userRepository = require('../repositories/user-repository')
const UserDto = require('../dto/user-dto')
const tokenService = require('../services/token-service')
const bcrypt = require('bcrypt')
const ApiError = require('../exceptions/api-error')

class AuthService {
    async signup(userContact, password, deviceId) {
        const candidate = await userRepository.findUserByContact(userContact)

        if (candidate !== null) {
            throw ApiError.BadRequest('Пользователь с таким контактом существует')
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await userRepository.createUser(userContact, hashPassword)

        return await this.generateUserSession(user, deviceId)
    }

    async signin(userContact, password, deviceId) {
        const user = await userRepository.findUserByContact(userContact)

        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким контактом не был найден')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }

        return await this.generateUserSession(user, deviceId)
    }

    async logout(refreshToken) {
        return await tokenService.deleteToken(refreshToken)
    }

    async generateUserSession(user, deviceId) {
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens( { ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken, deviceId)

        return {
            ...tokens,
            user: userDto,
        }
    }
}

module.exports = new AuthService()
