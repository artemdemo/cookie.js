// Karma configuration
// Generated on Fri Oct 30 2015 07:35:09 GMT+0300 (MSK)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['browserify', 'jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'source/*.es6',
            'test/*.spec.es6'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'source/*.es6': ['browserify'],
            'test/*.es6': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        },

        mochaReporter: {
            /*
             * Output style
             * full (default) - all output is printed to the console
             * autowatch - first run will have the full output and the next runs just output the summary and errors in mocha style
             * minimal - only the summary and errors are printed to the console in mocha style
             * noFailures - the failure details are not logged
             *
             * @source https://www.npmjs.com/package/karma-mocha-reporter
             */
            output: 'autowatch'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'html'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    })
};