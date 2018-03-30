'use strict';

const httpStatusCode = require('http-status');
const { HttpError } = require('./httpErrors');

module.exports = (res, error) => {

    if (error instanceof HttpError) {
        res.status(error.statusCode);

        res.json({
            message: error.message
        });

        return;
    }

    res.status(httpStatusCode.INTERNAL_SERVER_ERROR);
    res.end();
};