'use strict';

const _ = require('underscore');
const httpStatus = require('http-status');
const configDAO = require('./dao/configDAO');
const propertyDAO = require('./dao/propertyDAO');
const requestAccess = require('./requestAccess');
const configClientVersionSearch = require('./configClientVersionSearch');
const propertyConfigAndKeyUpdate = require('./propertyConfigAndKeyUpdate');

function getConfigForClientAndClientHandler(req, res, next) {
    const configReceived = requestAccess.getClientAndVersionParams(req);

    configClientVersionSearch.getObject(configDAO, configReceived)
        .then((config) => {
            return propertyDAO.findByConfigId(config.id);
        })
        .then((properties) => {
            let body = propertyObjectsToJson(properties);
            res.json(body);
        })
        .catch(next);

    function propertyObjectsToJson(properties) {
        let body = { };

        _.forEach(properties, (property) => {
            let tmp = {};
            tmp[property.key] = property.value;
            body = _.extend(body, tmp);
        });

        return body;
    }
}

function postConfigPropertyHandler(req, res, next) {
    const setup = requestAccess.getConfigSetupFromBody(req);

    configClientVersionSearch.getOrCreateObject(configDAO, setup.config)
        .then(result => {
            setup.property.configId = result.object.id;
            return propertyConfigAndKeyUpdate.updateOrCreateProperty(propertyDAO, setup.property);
        })
        .then(result => {
            if (result.isNewObject) {
                res.status(httpStatus.CREATED);
            }

            res.end();
        })
        .catch(next);
}

function deleteAllConfig(req, res, next) {
    propertyDAO.destroyAll()
        .then(() => configDAO.destroyAll())
        .then(() => res.end())
        .catch(error => {
            next(error);
        });
}

module.exports = {
    getConfigForClientAndClientHandler,
    postConfigPropertyHandler,
    deleteAllConfig
};
