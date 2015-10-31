// Main gulp file
var gulp = require('gulp');

// Babel module to transpile main 'cookie.js' file only
var babel = require('gulp-babel');

// Browserify and all modules that I need with it
var source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    babelify = require('babelify');

// Source maps, I will use it all builds
var sourcemaps = require('gulp-sourcemaps');

// Run shell commands (for karma)
var shell = require('gulp-shell');

/**
 * Compile example file, incl cookie.js library
 * @param watch {boolean}
 */
function compile_example(watch) {
    var bundler = watchify(browserify('./source/example.es6', { debug: true }).transform(babelify));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('example.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./example'));
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

/**
 * Run compile example with watcher
 * @returns {*}
 */
function watch() {
    return compile_example(true);
}

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
 * Run karma tests
 */
gulp.task('karma', shell.task([
    './node_modules/karma/bin/karma start'
]));

/**
 * Compile example AND watch changes for it
 */
gulp.task('compile_example', function() { return compile_example(); });
gulp.task('watch', function() { return watch(); });

/**
 * Default task
 * Watch files and run compile example
 */
gulp.task('default', ['watch']);

/**
 * Run kama tests
 */
gulp.task('test', ['karma']);