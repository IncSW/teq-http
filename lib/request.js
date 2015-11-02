'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cookie = require('./cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Request
 */
class Request {

    /**
     * 
     * @param {ClientRequest} request
     * 
     * @returns {undefined}
     */
    constructor(request) {
        this.httpRequest = request;
        this.query = _url2.default.parse(request.url, true).query;
        this.cookies = _cookie2.default.parse(request.headers.cookie);
        this.request = null;
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

        if (this.request !== null && this.request[key]) {
            return this.post[key];
        } else if (this.query[key]) {
            return this.query[key];
        }

        return defaultValue;
    }
}exports.default = Request;
;