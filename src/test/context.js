'use strict';

import statusCodes from '../lib/status-codes';
import Server from '../lib/server';
import request from 'supertest';

describe('context', () => {
    describe('end', () => {
        it('basic', (done) => {
            let server = new Server();

            server.on('request', (context) => {
                context.end(statusCodes[statusCodes.CREATED], statusCodes.CREATED);
            });

            request(server.httpServer).get('/').expect(statusCodes[statusCodes.CREATED]).expect(statusCodes.CREATED, done);
        });
    });

    describe('set/get', () => {
        it('basic', (done) => {
            let server = new Server();

            server.on('request', (context) => {
                context.set('foo', 'bar');
                context.end(context.get('foo'));
            });

            request(server.httpServer).get('/').expect('bar', done);
        });
    });
});