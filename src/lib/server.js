'use strict';

import statusCodes from './status-codes';
import EventEmitter from 'events';
import Context from './context';
import http from 'http';

const defaultConfig = {
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
     * @returns {Server}
     */
    constructor(config = {}) {
        let self;
        
        super();
        self = this;
        this.handler = null;
        this.config = config = this.prepareConfig(config);
        this.httpServer = http.createServer((request, response) => {
            let socket = request.socket;
            let timeout;
            let context;

            socket.removeAllListeners('timeout');
            context = new Context(request, response);
            response.on('finish', () => {
                clearTimeout(timeout);
                context.destroy();
                socket.destroy();
            });

            timeout = setTimeout(() => {
                context.end(statusCodes[statusCodes.GATEWAY_TIMEOUT], statusCodes.GATEWAY_TIMEOUT);
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
        let result = {};
        let key;

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
