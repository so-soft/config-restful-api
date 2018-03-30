const errorCode = {
    ACCESS: 'EACCES',
    ADDRESS_IN_USE: 'EADDRINUSE'
};

module.exports = function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errorHandling with friendly messages
    switch (error.code) {
        case error.ACCESS:
            console.error(bind + ' requires elevated privileges');
            break;
        case errorCode.ADDRESS_IN_USE:
            console.error(bind + ' is already in use');
            break;
        default:
            throw error;
    }

    process.exit(1);
};
