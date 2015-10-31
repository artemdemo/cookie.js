// Main gulp file
var gulp = require('gulp');

// Babel module to transpile main 'cookie.js' file only
var babel = require('gulp-babel');

// Browserify and all modules that I need with it
var vinylSource = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
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
function compile_example_bowserify(watch) {
    var bundler = watchify(browserify('./source/example.es6', { debug: true }).transform(babelify));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })

            // Now I need to convert browserify file stream into gulp stream, vinyl plugins will do it
            // @source http://stackoverflow.com/a/30851219
            .pipe(vinylSource('example.js'))
            .pipe(vinylBuffer())

            // Completing the process
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./example/browserify'));
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
function watch_example_browserify() {
    return compile_example_bowserify(true);
}

/**
 * Compile example AND watch changes for it
 */
gulp.task('compile_example_bowserify', function() { return compile_example_bowserify(); });
gulp.task('watch_example_browserify', function() { return watch_example_browserify(); });

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
 * Build browserify example
 * Watch files and run compile example
 */
gulp.task('browserify', ['watch_example_browserify']);

gulp.task('default', ['compile_example_bowserify']);

/**
 * Run kama tests
 */
gulp.task('test', ['karma']);