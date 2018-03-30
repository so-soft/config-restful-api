'use strict';

const ModelDAO = require('../../common/dao/ModelDAO');
const PropertyModel = require('../model/PropertyModel');

class PropertyDAO extends ModelDAO {
    constructor() {
        super(PropertyModel);
    }

    findByConfigId(configId) {
        let params = {configId};
        return this.findAll(params);
    }

    findByConfigAndKey(configId, key) {
        let params = {configId, key};
        return this.findOne(params);
    }

    createAndSave(data) {
        return super.createAndSave(data);
    }
}

module.exports = new PropertyDAO();
