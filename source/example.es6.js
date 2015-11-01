import {cookie} from './cookie.es6.js'

if (cookie.enabled()) {
    console.log('Cookie enabled');

    cookie.set('my-name', 'artem');

    console.log(cookie.all());
} else {
    console.error('Cookie is not enabled in your browser');
}