const tokenModel = require("../models/token-model");

class TokenRepository {
    async findTokenByDeviceId(deviceId) {
        return await tokenModel.findOne({
            where: {
                deviceId,
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
