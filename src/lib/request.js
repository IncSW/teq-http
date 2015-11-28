'use strict';

import cookie from './cookie';
import url from 'url';

/**
 * Request
 */
export default class Request {
    
    /**
     * 
     * @param {ClientRequest} request
     * 
     * @returns {Request}
     */
    constructor(request) {
        this.httpRequest = request;
        this.query = url.parse(request.url, true).query;
        this.cookies = cookie.parse(request.headers.cookie);
        this.request = null;
    }
    
    /**
     * 
     * @param {String} key
     * @param {*} [defaultValue=null]
     * 
     * @returns {*}
     */
    get(key, defaultValue = null) {
        if (this.request !== null && this.request[key]) {
            return this.post[key];
        } else if (this.query[key]) {
            return this.query[key];
        }

        return defaultValue;
    }
}
