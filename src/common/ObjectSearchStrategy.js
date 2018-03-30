'use strict';

const { NotFoundError, InternalServerError } = require('./errorHandling/httpErrors');

class ObjectSearchStrategy {

    searchPromise() { return Promise.reject(new InternalServerError()); }

    getOrCreateObject(dao, configParams) {
        const result = {
            isNewObject: false
        };

        return this.getObject(dao, configParams)
            .catch(error => {
                if (error instanceof NotFoundError) {
                    result.isNewObject = true;
                    return dao.createAndSave(configParams);
                }

                throw error;
            })
            .then(object => {
                result.object = object;

                return result;
            });
    }

    getObject(dao, configParams) {
        return this.searchPromise(dao, configParams)
            .then(object => {

                if (object) {
                    return object;
                }

                throw new NotFoundError('Object not found');
            });
    }
}

module.exports = ObjectSearchStrategy;