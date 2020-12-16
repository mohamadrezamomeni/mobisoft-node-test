const mongoose = require('mongoose');
const debug = require('debug')('bootstrap:db');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, function () {
    debug('mongodb connected');
});

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', function () {
    debug('Mongoose default connection open to %s ', process.env.MONGO_URI);
});
mongoose.connection.on('error', function (err) {
    debug('Mongoose default connection error: %s ', err);
});
mongoose.connection.on('disconnected', function () {
    debug('Mongoose default connection disconnected');
});
mongoose.connection.on('open', function () {
    debug('Mongoose default connection is open');
});
mongoose.set('useCreateIndex', true);
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        debug('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = mongoose;