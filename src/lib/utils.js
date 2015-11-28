'use strict';

let parseParameters;
let parseParameter;

/**
 * 
 * @param {String} parameterString
 * 
 * @returns {Array}
 */
parseParameter = function parseParameter(parameterString) {
    let parts = parameterString.split('=');
    let key = parts.shift().trim();
    let value = parts.join('=').trim();
    
    if (!value) {
        value = [key, null];
    } else {
        if (value[0] === '"') {
            value = value.slice(1, -1); //eslint-disable-line no-magic-numbers
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
parseParameters = function parseParameters(parameters) {
    let result;
    let parts;
    let i;
    
    if (typeof parameters === 'string') {
        parameters = parameters.split(';');
    }
    if (!Array.isArray(parameters)) {
        throw new TypeError('parameters must be a String or Array');
    }
    i = parameters.length;
    result = {};
    while (i--) {
        parts = parseParameter(parameters[i]);
        result[parts[0]] = parts[1];
    }
    
    return result;
};

export {
    parseParameters,
    parseParameter
};

export default {
    parseParameters,
    parseParameter
};
