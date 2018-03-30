'use strict';

const ObjectSearchStrategy = require('../common/ObjectSearchStrategy');

class ConfigClientVersionSearch extends ObjectSearchStrategy {
    searchPromise(dao, configParams) {
        return dao.findByVersionAndClient(configParams.version, configParams.client);
    }
}

module.exports = new ConfigClientVersionSearch();
