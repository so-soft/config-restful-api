'use strict';

const Sequelize = require('sequelize');
const sequelizeConnection = require('../../common/dababaseConnection');

const Property = sequelizeConnection.define('config_property', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    key: Sequelize.STRING,
    value: Sequelize.STRING,
});

module.exports = Property;
