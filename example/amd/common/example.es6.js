'use strict';

var _cookieEs = require('./cookie.es6.js');

if (_cookieEs.cookie.enabled()) {
    console.log('Cookie enabled');

    _cookieEs.cookie.set('my-name', 'artem');

    console.log(_cookieEs.cookie.all());
} else {
    console.error('Cookie is not enabled in your browser');
}