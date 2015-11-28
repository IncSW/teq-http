'use strict';

/**
 * 
 * @param {String} cookieString
 * 
 * @returns {Object}
 */
export function parse(cookieString) {
    let cookieArray;
    let cookies;
    let parts;
    let value;
    let key;
    let i;

    if (typeof cookieString !== 'string') {
        return {};
    }
    cookies = {};
    cookieArray = cookieString.split(';');
    i = cookieArray.length;

    while (i--) {
        parts = cookieArray[i].split('=');
        key = parts.shift().trim();
        value = parts.join('=').trim();
        if (!value) {
            value = null;
        } else {
            if (value[0] === '"') {
                value = value.slice(1, -1); //eslint-disable-line no-magic-numbers
            }
            try {
                value = decodeURIComponent(value);
            } catch (e) { } //eslint-disable-line no-empty
        }
        cookies[key] = value;
    }

    return cookies;
}

export default {
    parse
};
