var gulp = require('gulp');

// Run shell commands (for karma)
var shell = require('gulp-shell');

/**
 * Run karma tests
 */
gulp.task('karma', shell.task([
    './node_modules/karma/bin/karma start'
]));