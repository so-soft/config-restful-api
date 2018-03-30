'use strict';

const Config = require('./ConfigModel');
const Property = require('./PropertyModel');

Config.hasMany(
    Property, {
        constraints: false,
        as :'Properties'
    }
);

Property.belongsTo(Config, {
    constraints: false,
    foreignKey: 'configId',
    as: 'Config'
});
