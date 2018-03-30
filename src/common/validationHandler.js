'use strict';

const _ = require('underscore');
const { validationResult } = require('express-validator/check');
const { BadRequestError } = require('./errorHandling/httpErrors');

const checkErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const errorsMapped = _.map(errors.mapped(), (error) => {
        return error.msg;
    });

    throw new BadRequestError(errorsMapped);
};

module.exports = {
    create (handlers) {
        handlers.push(checkErrorHandler);
        return handlers;
    }
};

