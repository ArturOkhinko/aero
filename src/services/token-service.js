const jwt = require('jsonwebtoken')
const tokenRepository = require('../repositories/token-repository')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '10m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
            return userData
        }
        catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
            return userData
        }
        catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken, deviceId){
        const tokenData = await tokenRepository.findTokenByDeviceIdAndUserId(deviceId, userId)
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
