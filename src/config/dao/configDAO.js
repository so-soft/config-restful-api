'use strict';

const ModelDAO = require('../../common/dao/ModelDAO');
const ConfigModel = require('../model/ConfigModel');

class ConfigDAO extends ModelDAO {
    constructor() {
        super(ConfigModel);
    }

    findByVersionAndClient(version, client) {
        return this.findOne({version, client});
    }
}

module.exports = new ConfigDAO();
