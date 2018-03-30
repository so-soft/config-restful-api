'use strict';

const Sequelize = require('sequelize');
const serviceConfig = require('../serviceConfig');

const sequelize = new Sequelize(serviceConfig.databaseUrl,{
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');

    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });

sequelize.sync();

module.exports = sequelize;