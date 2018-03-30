'use strict';

class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class NotFoundError extends HttpError {
    constructor(message) {
        super(message, 404);
    }
}
class BadRequestError extends HttpError {
    constructor(message) {
        super(message, 400);
    }
}
class InternalServerError extends HttpError {
    constructor(message) {
        super(message, 500);
    }
}

module.exports = {
    HttpError,
    NotFoundError,
    BadRequestError,
    InternalServerError
};
