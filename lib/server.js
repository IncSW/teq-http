'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig;

defaultConfig = {
    timeout: 1000
};

/**
 * Server
 */
class Server extends _events2.default {

    /**
     * 
     * @param {Object} [config={}]
     * 
     * @returns {undefined}
     */
    constructor() {
        let config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        super();
        var self = this;

        this.handler = null;
        this.config = config = this.prepareConfig(config);
        this.httpServer = _http2.default.createServer(function serverHandler(request, response) {
            var socket = request.socket;
            var timeout;
            var context;

            socket.removeAllListeners('timeout');
            context = new _context2.default(request, response);
            response.on('finish', function responseFinish() {
                clearTimeout(timeout);
                context.destroy();
                socket.destroy();
            });

            timeout = setTimeout(function timeout() {
                context.end('504 Gateway Timeout', 504);
            }, config.timeout);

            self.emit('request', context);
        });
    }

    /**
     * 
     * @param {Object} config
     * 
     * @returns {Object}
     */
    prepareConfig(config) {
        var result = {};
        var key;

        for (key in defaultConfig) {
            result[key] = config[key] === undefined ? defaultConfig[key] : config[key];
        }

        return result;
    }

    /**
     * 
     * @param {Number} port
     * 
     * @returns {Server}
     */
    listen(port) {
        this.httpServer.listen(port);

        return this;
    }
}
exports.default = Server;