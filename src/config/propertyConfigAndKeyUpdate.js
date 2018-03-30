'use strict';

const ObjectSearchStrategy = require('../common/ObjectSearchStrategy');

class PropertyConfigAndKeyUpdate extends ObjectSearchStrategy {
    searchPromise(dao, propertyParams) {
        return dao.findByConfigAndKey(propertyParams.configId, propertyParams.key);
    }

    updateOrCreateProperty(propertyDAO, properties) {
        const self = this;

        return this.getOrCreateObject(propertyDAO, properties)
            .then((result) => {

                if (result.isNewObject) {
                    return result;
                }

                return self.updateProperty(propertyDAO, result, properties);
            });
    }

    updateProperty(propertyDAO, result, properties) {
        result.object.value = properties.value;

        return propertyDAO.save(result.object)
            .then(object => {
                result.object = object;

                return result;
            });
    }
}

module.exports = new PropertyConfigAndKeyUpdate();