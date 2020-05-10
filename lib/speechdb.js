/*
 * @file ppdb.js
 */

'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const appcf = require('./appcf');
const SpeechError = require('./error');

function autoIncrementPlugin (schema, options) {
    schema.pre('save', function (next) {
        this.increment();
        next();
    });
}
mongoose.plugin(autoIncrementPlugin);

var cf = appcf.getCfSync('speechdb');
var conn = mongoose.createConnection(cf.uri, cf.options);
conn.on('error', function () {
    throw new SpeechError('speech Database connection failed.');
});


module.exports = conn;