'use strict';

import cookie from '../lib/cookie';
import assert from 'assert';

describe('cookie', () => {
    describe('parse()', () => {
        it('basic', () => {
            assert.deepEqual({ foo: 'bar' }, cookie.parse('foo=bar'));
            assert.deepEqual({ foo: '123' }, cookie.parse('foo=123'));
        });

        it('ignore spaces', () => {
            assert.deepEqual({ foo: 'bar', baz: 'raz' }, cookie.parse('foo    = bar;   baz  =   raz'));
        });

        it('escaping', () => {
            assert.deepEqual({ foo: 'bar=123456789&name=Magic+Mouse' }, cookie.parse('foo="bar=123456789&name=Magic+Mouse"'));
            assert.deepEqual({ email: ' ",;/' }, cookie.parse('email=%20%22%2c%3b%2f'));
        });

        it('ignore escaping error and return original value', () => {
            assert.deepEqual({ foo: '%1', bar: 'bar' }, cookie.parse('foo=%1;bar=bar'));
        });

        it('non values as null', () => {
            assert.deepEqual({ foo: '%1', bar: 'bar', non: null }, cookie.parse('foo=%1;bar=bar;non'));
        });
    });
});