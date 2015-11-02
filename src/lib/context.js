'use strict';

import Response from './response';
import Request from './request';

/**
 * Context
 */
export default class Context {
    
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
        this.request = new Request(request);
        this.response = new Response(response);
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
    get(key, defaultValue = null) {
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
};