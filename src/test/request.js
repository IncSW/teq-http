'use strict';

import Server from '../lib/server';
import request from 'supertest';

describe('request', () => {
    describe('get', () => {
        it('basic', (done) => {
            let server = new Server();

            server.on('request', (context) => {
                context.end(context.request.get('foo'));
            });

            request(server.httpServer).get('/?foo=bar').expect('bar', done);
        });
    });
});