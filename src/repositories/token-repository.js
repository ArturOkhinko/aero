const tokenModel = require('../models/token-model')

class TokenRepository {
    async findTokenByDeviceIdAndUserId(deviceId, userId) {
        return await tokenModel.findOne({
            where: {
                deviceId,
                userId,
            },
            rejectOnEmpty: undefined,
        })
    }

    async findTokenByRefreshToken(refreshToken) {
        return await tokenModel.findOne({
            where: {
                refreshToken,
            },
            rejectOnEmpty: undefined,
        })
    }

    async createToken(refreshToken, userId, deviceId) {
        return await tokenModel.create({ refreshToken, userId, deviceId })
    }

    async deleteToken(refreshToken) {
        return tokenModel.destroy({
            where: {
                refreshToken
            }
        })
    }
}

module.exports = new TokenRepository()
