const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    username: 'a0838485_a0838485',
    database: 'a0838485_a0838485',
    password: 'an94hrjb49ufc4hfcdj',
    host: '141.8.192.193',
    dialect: 'mysql',
    port: 3306,
});

sequelize.authenticate()
    .then(() => console.log('Connection to MySQL has been established successfully.'))
    .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
