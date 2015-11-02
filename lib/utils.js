'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var parseParameters;
var parseParameter;

/**
 * 
 * @param {String} parameterString
 * 
 * @returns {Array}
 */
exports.parseParameter = parseParameter = function parseParameter(parameterString) {
    var parts = parameterString.split('=');
    var key = parts.shift().trim();
    var value = parts.join('=').trim();

    if (!value) {
        value = [key, null];
    } else {
        if (value[0] === '"') {
            value = value.slice(1, -1);
        }
    }

    return [key, value];
};

/**
 * 
 * @param {String|Array} parameters
 * 
 * @throws {TypeError}
 * 
 * @returns {Object}
 */
exports.parseParameters = parseParameters = function parseParameters(parameters) {
    if (typeof parameters === 'string') {
        parameters = parameters.split(';');
    }
    if (!Array.isArray(parameters)) {
        throw new TypeError('parameters must be a String or Array');
    }
    var i = parameters.length;
    var result = {};
    var parts;

    while (i--) {
        parts = parseParameter(parameters[i]);
        result[parts[0]] = parts[1];
    }

    return result;
};

exports.parseParameters = parseParameters;
exports.parseParameter = parseParameter;
exports.default = {
    parseParameters,
    parseParameter
};