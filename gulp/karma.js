var gulp = require('gulp');

var shell = require('gulp-shell');

/**
 * Run karma tests
 */
gulp.task('karma', shell.task([
    './node_modules/karma/bin/karma start'
]));