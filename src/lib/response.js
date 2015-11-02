'use strict';

/**
 * Response
 */
export default class Response {
    
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
    end(data, statusCode = 200) {
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
    setCookie(key, value, expires, path, domain, httpOnly = false, secure = false) {
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
};