const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    username: process.env.DB_USER_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306,
});

sequelize.authenticate()
    .then(() => console.log('Connection to MySQL has been established successfully.'))
    .catch((err) => console.error('Unable to connect to the database:', err))

module.exports = sequelize
