'use strict';

const { check } = require('express-validator/check');
const validationHandler = require('../common/validationHandler');

const versionValidation = check('version')
    .isNumeric()
    .withMessage('Version must be a number');

const versionPositiveNumberValidation = check('version')
    .custom((value, { req }) => {
        return parseInt(value) > 0
    })
    .withMessage('Version must be a positive number');

const clientValidation  = check('client')
    .isAlphanumeric()
    .withMessage('Client must be alphanumeric');

const keyValidation  = check('key')
    .exists()
    .withMessage('Key cannot be empty');

const ValueValidation  =  check('value')
    .exists()
    .withMessage('Value cannot be empty');

const getConfigForClientAndClientValidation = validationHandler.create([
    versionValidation ,
    clientValidation]);

const postConfigSetupValidation = validationHandler.create([
    versionValidation,
    versionPositiveNumberValidation,
    clientValidation,
    keyValidation,
    ValueValidation]);

module.exports = {
    getConfigForClientAndClientValidation,
    postConfigSetupValidation
};
