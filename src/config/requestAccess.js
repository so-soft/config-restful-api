'use strict';

module.exports = {
    getClientAndVersionParams(request) {
        const  params = request.params;

        return {
            client: params.client,
            version: params.version
        };
    },
    getConfigSetupFromBody(request) {
        const body = request.body;
        return {
            config: {
                client: body.client,
                version: parseInt(body.version),
            },
            property: {
                key: body.key,
                value: body.value
            }
        };
    }
}