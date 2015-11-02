'use strict';

import Server from '../lib/server';
import request from 'supertest';
import assert from 'assert';

describe('request', function () {

    describe('get', function () {

        it('basic', function (done) {

            var server = new Server();

            server.on('request', function (context) {
                context.end(context.request.get('foo'));
            });

            request(server.httpServer).get('/?foo=bar').expect('bar', done);

        });

    });

});