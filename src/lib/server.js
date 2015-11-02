'use strict';

import EventEmitter from 'events';
import Context from './context';
import http from 'http';

var defaultConfig;

defaultConfig = {
    timeout: 1000
};

/**
 * Server
 */
export default class Server extends EventEmitter {
    
    /**
     * 
     * @param {Object} [config={}]
     * 
     * @returns {undefined}
     */
    constructor(config = {}) {
        super();
        var self = this;

        this.handler = null;
        this.config = config = this.prepareConfig(config);
        this.httpServer = http.createServer(function serverHandler(request, response) {
            var socket = request.socket;
            var timeout;
            var context;

            socket.removeAllListeners('timeout');
            context = new Context(request, response);
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