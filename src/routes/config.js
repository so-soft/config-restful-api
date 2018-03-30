'use strict';

const express = require('express');
const router = express.Router();
const validationHandlers = require('../config/configValidationHandlers');
const routeHandlers = require('../config/configRouteHandlers');


router.get('/:client/:version',
    validationHandlers.getConfigForClientAndClientValidation,
    routeHandlers.getConfigForClientAndClientHandler);

router.post('/',
    validationHandlers.postConfigSetupValidation,
    routeHandlers.postConfigPropertyHandler);

router.delete('/delete/all',
    routeHandlers.deleteAllConfig);

module.exports = router;
