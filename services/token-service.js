const jwt = require('jsonwebtoken')
const tokenRepository = require('../repositories/token-repository')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '10m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken, deviceId){
        const tokenData = await tokenRepository.findTokenByDeviceId(deviceId)
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        return await tokenRepository.createToken(refreshToken, userId, deviceId)
    }

    async deleteToken(refreshToken) {
        return await tokenRepository.deleteToken(refreshToken)
    }
}

module.exports = new TokenService()
