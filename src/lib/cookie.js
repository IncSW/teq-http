'use strict';

/**
 * 
 * @param {String} cookieString
 * 
 * @returns {Object}
 */
export function parse(cookieString) {
    if (typeof cookieString !== 'string') {
        return {};
    }
    var cookieArray = cookieString.split(';');
    var i = cookieArray.length;
    var cookies = {};
    var parts;
    var value;
    var key;

    while (i--) {
        parts = cookieArray[i].split('=');
        key = parts.shift().trim();
        value = parts.join('=').trim();
        if (!value) {
            value = null;
        } else {
            if (value[0] === '"') {
                value = value.slice(1, -1);
            }
            try {
                value = decodeURIComponent(value)
            } catch (e) { }
        }
        cookies[key] = value;
    }

    return cookies;
};

export default {
    parse
};