'use strict';

var _cookie = require('../lib/cookie');

var _cookie2 = _interopRequireDefault(_cookie);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('cookie', function () {

    describe('parse()', function () {

        it('basic', function () {

            _assert2.default.deepEqual({ foo: 'bar' }, _cookie2.default.parse('foo=bar'));

            _assert2.default.deepEqual({ foo: '123' }, _cookie2.default.parse('foo=123'));
        });

        it('ignore spaces', function () {

            _assert2.default.deepEqual({ foo: 'bar', baz: 'raz' }, _cookie2.default.parse('foo    = bar;   baz  =   raz'));
        });

        it('escaping', function () {

            _assert2.default.deepEqual({ foo: 'bar=123456789&name=Magic+Mouse' }, _cookie2.default.parse('foo="bar=123456789&name=Magic+Mouse"'));

            _assert2.default.deepEqual({ email: ' ",;/' }, _cookie2.default.parse('email=%20%22%2c%3b%2f'));
        });

        it('ignore escaping error and return original value', function () {

            _assert2.default.deepEqual({ foo: '%1', bar: 'bar' }, _cookie2.default.parse('foo=%1;bar=bar'));
        });

        it('non values as null', function () {

            _assert2.default.deepEqual({ foo: '%1', bar: 'bar', non: null }, _cookie2.default.parse('foo=%1;bar=bar;non'));
        });
    });
});