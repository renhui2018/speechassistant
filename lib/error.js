/*
 * @file error.js
 */

const wlogger = require('winston');

function SpeechError(message) {
    this.message = message;
    Error.captureStackTrace(this, SpeechError);
}


function createErrorHandler(res, next) {
    var handleError = function(err) {
        wlogger.error(err.message);
        if (err instanceof SpeechError) {
            res.send({ok: false, error: err.message});
        } else {
            next(err);
        }
    };
    return handleError;
}

SpeechError.prototype = Object.create(Error.prototype);
SpeechError.prototype.name = "SpeechError";
SpeechError.prototype.constructor = SpeechError;
SpeechError.createErrorHandler = createErrorHandler;

module.exports = SpeechError;