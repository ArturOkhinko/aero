const UserModel = require('../models/user-model')

class UserRepository {
    async findUserByContact(userContact) {
        return await UserModel.findOne({
            where: {
                userContact,
            },
        })
    }

    async findUserById(id) {
        return await UserModel.findOne({
            where: {
                id,
            },
        })
    }

    async createUser(userContact, password) {
        return await UserModel.create({ userContact, password })
    }
}

module.exports = new UserRepository()
