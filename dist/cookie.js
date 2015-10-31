'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _typeof(obj) { return obj && obj.constructor === Symbol ? "symbol" : typeof obj; }

var cookie = exports.cookie = (function () {

    /**
     * Set of helper functions
     * @type {*}
     */
    var helpers = {

        /**
         * Is the given value a plain object / an object whose constructor is `Object`?
         * @param {*} value
         * @returns {boolean}
         */
        isPlainObject: function isPlainObject(value) {
            return !!value && Object.prototype.toString.call(value) === '[object Object]';
        },

        /**
         * Unlike JavaScript's built-in escape functions, this method
         * only escapes characters that are not allowed in cookies.
         * @param {string} value
         * @returns {string}
         */
        encode: function encode(value) {
            return String(value).replace(/[,;"\\=\s%]/g, function (character) {
                return encodeURIComponent(character);
            });
        },

        /**
         * Decode
         * @param {string} value
         * @returns {string}
         */
        decode: function decode(value) {
            return decodeURIComponent(value);
        },

        /**
         * Return fallback if the value is not defined, otherwise return value.
         * @param value
         * @param fallback
         * @returns {*}
         */
        retrieve: function retrieve(value, fallback) {
            return value == null ? fallback : value;
        }
    };

    /**
     * Main module object
     * @type {*}
     * @note
     * Why I'm using 'function() {}' instead of 'Arrow function' ?
     * Pay attention that I'm using 'arrow function' _AND_ regular function declaration with 'function() {}'
     * It's not an accident. 'Arrow function' will keep 'this' of outer scope and in this case it wouldn't be
     * the main 'cookie' object as you hope. It will be global 'this' and in case of module it will get 'undefined'
     * @source https://github.com/babel/babel/issues/562#issuecomment-70914673
     */
    var cookie = {

        /**
         * Default options
         */
        defaultOptions: {
            expires: '',
            domain: null,
            path: null,
            secure: false
        },

        /**
         * By default expires time in the options is in days.
         */
        expiresMultiplier: 60 * 60 * 24,

        /**
         * Set cookie. Value will be escaped for you
         * @param key
         * @param value
         * @param userOptions
         * @returns {*}
         * @example
         *    cookie.set('key', 'value');
         * @example
         *    cookie.set({
         *       key1: 'value1',
         *       key2: 'value2'
         *    });
         * @example
         *    cookie.set('key', 'value', {
         *       expires: 7, // expires in one week
         *    });
         * @note
         * Yes, I'm using 'function() {}' instead of 'Arrow function', see explanation above
         */
        set: function set(key, value, userOptions) {
            if (helpers.isPlainObject(key)) {
                // `key` contains an object with keys and values for cookies, `value` contains the options object.

                for (var k in key) {
                    if (key.hasOwnProperty(k)) this.set(k, key[k], value);
                }
            } else {
                var options = Object.assign(this.defaultOptions, userOptions);

                // Empty string for session cookies.
                var expiresType = _typeof(options.expires);

                if (expiresType === 'string' && options.expires !== '') {
                    options.expires = new Date(options.expires);
                } else if (expiresType === 'number') {
                    // This is needed because IE does not support the `max-age` cookie attribute.
                    options.expires = new Date(+new Date() + 1000 * this.expiresMultiplier * options.expires);
                }

                if (options.expires !== '' && 'toGMTString' in options.expires) {
                    options.expires = ';expires=' + options.expires.toGMTString();
                }

                var path = options.path ? ';path=' + options.path : '';
                var domain = options.domain ? ';domain=' + options.domain : '';
                var secure = options.secure ? ';secure' : '';

                document.cookie = helpers.encode(key) + '=' + helpers.encode(value) + options.expires + path + domain + secure;
            }

            return this; // Return the `cookie` object to make chaining possible.
        },

        /**
         *
         * @param key
         * @param value
         * @param options
         * @returns {*}
         * @note
         * Yes, I'm using 'function() {}' instead of 'Arrow function', see explanation above
         */
        setDefault: function setDefault(key, value, options) {
            if (helpers.isPlainObject(key)) {
                for (var k in key) {
                    if (key.hasOwnProperty(k) && this.get(k) === undefined) this.set(k, key[k], value);
                }
                return cookie;
            } else if (this.get(key) === undefined) {
                return this.set.apply(this, arguments);
            }
        },

        /**
         *
         * @param keyArguments
         * @returns {cookie} - Return the `cookie` object to make chaining possible.
         * @note
         * Yes, I'm using 'function() {}' instead of 'Arrow function', see explanation above
         */
        remove: function remove() {
            for (var _len = arguments.length, keyArguments = Array(_len), _key = 0; _key < _len; _key++) {
                keyArguments[_key] = arguments[_key];
            }

            var keys = Array.isArray(keyArguments[0]) ? keyArguments[0] : keyArguments;

            for (var i = 0, len = keys.length; i < len; i++) {
                this.set(keys[i], '', -1);
            }

            return this;
        },

        /**
         * Remove all cookies
         * @note
         * Yes, I'm using 'function() {}' instead of 'Arrow function', see explanation above
         */
        empty: function empty() {
            this.remove(Object.keys(this.all()));
        },

        /**
         *
         * @param keys
         * @param fallback
         * @returns {*}
         * @note
         * Yes, I'm using 'function() {}' instead of 'Arrow function', see explanation above
         */
        get: function get(keys, fallback) {
            var cookies = this.all();

            if (Array.isArray(keys)) {
                var result = {};

                for (var i = 0, len = keys.length; i < len; i++) {
                    var value = keys[i];
                    result[value] = helpers.retrieve(cookies[value], fallback);
                }

                return result;
            }

            return helpers.retrieve(cookies[keys], fallback);
        },

        /**
         * Returns objet with all available cookie
         * @returns {{}}
         */
        all: function all() {
            if (document.cookie === '') return {};

            var cookies = document.cookie.split('; '),
                result = {};

            for (var i = 0, len = cookies.length; i < len; i++) {
                var item = cookies[i].split('=');
                var key = helpers.decode(item.shift());
                result[key] = helpers.decode(item.join('='));
            }

            return result;
        },

        /**
         * Check whether cookies are enabled in the browser
         * @returns {boolean}
         */
        enabled: function enabled() {
            if (navigator.cookieEnabled) return true;

            var result = cookie.set('_', '_').get('_') === '_';
            cookie.remove('_');
            return result;
        }
    };

    return cookie;
})();
//# sourceMappingURL=cookie.js.map
