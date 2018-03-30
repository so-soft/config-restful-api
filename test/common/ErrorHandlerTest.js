const sinon = require('sinon');
const assert = require('chai').assert;
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status');

const errorHandler = require('../../src/common/errorHandling/errorHandler');
const { HttpError, BadRequestError } = require('../../src/common/errorHandling/httpErrors');

function createResponse() {
    return {
        status: sinon.spy(),
        end: sinon.spy(),
        json: sinon.spy()
    };
}

describe('errorHandlerTest', () => {
    it ('should set internal error status when error is not http error',  () => {
        let error = new Error();
        let response = createResponse();

        errorHandler(response, error);

        assert(response.status.calledOnce);
        assert(response.end.calledOnce);
        assert(response.json.notCalled);
        assert(response.status.calledWith(INTERNAL_SERVER_ERROR));
    });

    it ('should set response status as expected when error is http error',  () => {
        let expectedStatusCode = BAD_REQUEST;
        let error = new BadRequestError();
        let response = createResponse();

        errorHandler(response, error);

        assert(response.status.calledOnce);
        assert(response.status.calledWith(expectedStatusCode));
    });

    it ('should send body when error is http error',  () => {
        let error = new BadRequestError();
        let response = createResponse();

        errorHandler(response, error);

        assert(response.end.notCalled);
        assert(response.json.calledOnce);
    });
});