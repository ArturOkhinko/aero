const TokenModel = require("./token-model");
const UserModel = require('./user-model')


UserModel.hasMany(TokenModel, {
    foreignKey: 'userId',
    as: 'token',
    onDelete: 'CASCADE'
})

TokenModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'userId'
})
