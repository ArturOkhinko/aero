const { DataTypes } = require('sequelize')
const sequelize = require('../../database')

const File = sequelize.define('File', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    size: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    extName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    linkToStorage: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'files',
    timestamps: true,
})

module.exports = File
