'use strict';

var _server = require('../lib/server');

var _server2 = _interopRequireDefault(_server);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('request', function () {

    describe('get', function () {

        it('basic', function (done) {

            var server = new _server2.default();

            server.on('request', function (context) {
                context.end(context.request.get('foo'));
            });

            (0, _supertest2.default)(server.httpServer).get('/?foo=bar').expect('bar', done);
        });
    });
});