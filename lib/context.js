'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _response = require('./response');

var _response2 = _interopRequireDefault(_response);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Context
 */
class Context {

    /**
     * 
     * @param {ClientRequest} request
     * @param {ServerResponse} response
     * 
     * @returns {undefined}
     */
    constructor(request, response) {
        this.ended = false;
        this.start = process.hrtime();
        this.request = new _request2.default(request);
        this.response = new _response2.default(response);
        this.values = new Map();
    }

    /**
     * 
     * @param {String} key
     * @param {*} value
     * 
     * @returns {Context}
     */
    set(key, value) {
        this.values.set(key, value);

        return this;
    }

    /**
     * 
     * @param {String} key
     * @param {*} [defaultValue=null]
     * 
     * @returns {*}
     */
    get(key) {
        let defaultValue = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        if (!this.values.has(key)) {
            return defaultValue;
        }

        return this.values.get(key);
    }

    /**
     * 
     * @param {String} data
     * @param {Number} statusCode
     * 
     * @returns {Boolean}
     */
    end(data, statusCode) {
        if (this.ended) {
            return false;
        }
        this.response.end(data, statusCode);
        this.destroy();

        return true;
    }

    /**
     * 
     * @returns {Number}
     */
    getTime() {
        var diff = process.hrtime(this.start);

        return diff[0] * 1e9 + diff[1];
    }

    /**
     * 
     * @returns {Context}
     */
    destroy() {
        this.ended = true;
        this.request = null;
        this.response = null;
        this.values.clear();

        return this;
    }
}exports.default = Context;
;