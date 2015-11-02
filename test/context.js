'use strict';

var _server = require('../lib/server');

var _server2 = _interopRequireDefault(_server);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('context', function () {

    describe('end', function () {

        it('basic', function (done) {

            var server = new _server2.default();

            server.on('request', function (context) {
                context.end('Created', 201);
            });

            (0, _supertest2.default)(server.httpServer).get('/').expect('Created').expect(201, done);
        });
    });

    describe('set/get', function () {

        it('basic', function (done) {

            var server = new _server2.default();

            server.on('request', function (context) {
                context.set('foo', 'bar');
                context.end(context.get('foo'));
            });

            (0, _supertest2.default)(server.httpServer).get('/').expect('bar', done);
        });
    });
});