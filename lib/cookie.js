'use strict'

/**
 * 
 * @param {String} cookieString
 * 
 * @returns {Object}
 */
;
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parse = parse;
function parse(cookieString) {
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
                value = decodeURIComponent(value);
            } catch (e) {}
        }
        cookies[key] = value;
    }

    return cookies;
};

exports.default = {
    parse
};