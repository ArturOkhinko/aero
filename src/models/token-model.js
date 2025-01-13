const { DataTypes } = require('sequelize')
const sequelize = require('../../database')

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
    deviceId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'tokens',
    timestamps: true,
})

module.exports = Token
