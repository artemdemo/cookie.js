var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

require('./gulp/karma');
require('./gulp/browserify');

/**
 * 'Build task'
 * Will build cookie.js library only
 */
gulp.task('build', function () {
    return gulp.src('source/cookie.es6')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['babel-preset-es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});


/**
 * Build browserify example
 * Watch files and run compile example
 */
gulp.task('browserify', ['watch_example_browserify']);

gulp.task('default', ['compile_example_bowserify']);

/**
 * Run kama tests
 */
gulp.task('test', ['karma']);