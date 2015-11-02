'use strict';

import Server from '../lib/server';
import request from 'supertest';
import assert from 'assert';

describe('context', function () {

    describe('end', function () {

        it('basic', function (done) {

            var server = new Server();

            server.on('request', function (context) {
                context.end('Created', 201);
            });

            request(server.httpServer).get('/').expect('Created').expect(201, done);

        });

    });

    describe('set/get', function () {

        it('basic', function (done) {

            var server = new Server();

            server.on('request', function (context) {
                context.set('foo', 'bar');
                context.end(context.get('foo'));
            });

            request(server.httpServer).get('/').expect('bar', done);

        });

    });

});