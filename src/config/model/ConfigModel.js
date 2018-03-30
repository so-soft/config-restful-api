'use strict';

const Sequelize = require('sequelize');
const sequelizeConnection = require('../../common/dababaseConnection');

const Config = sequelizeConnection.define('config', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    version: Sequelize.INTEGER,
    client: Sequelize.STRING
});

module.exports = Config;
