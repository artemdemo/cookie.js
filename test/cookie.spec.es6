import {cookie} from '../source/cookie.es6';

describe('Cookie.js', () => {

    describe('Test case', () => {
        it('Browser should allow cookies', () => expect(cookie.enabled()).toBe(true));
        it('Test cookie should be removed', () => expect(cookie.get('_')).toBe(undefined));
        it('Fallback should be "null"', () => expect(cookie.get('_', null)).toBe(null));
    });

});