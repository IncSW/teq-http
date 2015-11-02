'use strict'

/**
 * Response
 */
;
Object.defineProperty(exports, "__esModule", {
    value: true
});
class Response {

    /**
     * 
     * @param {ServerResponse} response
     * 
     * @returns {undefined}
     */
    constructor(response) {
        this.httpResponse = response;
        this.headers = [];
    }

    /**
     * 
     * @param {String} data
     * @param {Number} [statusCode=200]
     * 
     * @returns {Boolean}
     */
    end(data) {
        let statusCode = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];

        var response = this.httpResponse;

        if (response.finished) {
            return false;
        }
        if (this.headers.length) {
            response.writeHead(statusCode, this.headers);
        } else {
            response.statusCode = statusCode;
        }
        response.end(data);

        return true;
    }

    /**
     * 
     * @param {String} key
     * @param {String} value
     * @param {String} expires
     * @param {String} path
     * @param {String} domain
     * @param {Boolean} httpOnly
     * @param {Boolean} secure
     * 
     * @returns {Boolean}
     */
    setCookie(key, value, expires, path, domain) {
        let httpOnly = arguments.length <= 5 || arguments[5] === undefined ? false : arguments[5];
        let secure = arguments.length <= 6 || arguments[6] === undefined ? false : arguments[6];

        var cookie;

        if (this.httpResponse.finished) {
            return false;
        }

        cookie = [key + '=' + value];
        if (expires) {
            cookie.push('expires=' + new Date(expires).toUTCString());
        }
        if (path) {
            cookie.push('path=' + path);
        }
        if (domain) {
            cookie.push('domain=' + domain);
        }
        if (httpOnly) {
            cookie.push('httpOnly');
        }
        if (secure) {
            cookie.push('secure');
        }
        this.headers.push(['Set-Cookie', cookie.join('; ')]);

        return true;
    }
}exports.default = Response;
;