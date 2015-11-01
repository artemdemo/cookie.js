var gulp = require('gulp');

// Browserify and all modules that I need with it
var vinylSource = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    babelify = require('babelify');

// Source maps, I will use it all builds
var sourcemaps = require('gulp-sourcemaps');

/**
 * Compile example file, incl cookie.es6.js library
 * @param watch {boolean}
 */
function compile_example_bowserify(watch) {
    var bundler = watchify(browserify('./source/example.es6.js', { debug: true }).transform(babelify));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })

            // Now I need to convert browserify file stream into gulp stream, vinyl plugins will do it
            // @source http://stackoverflow.com/a/30851219
            .pipe(vinylSource('example.es6.js'))
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
gulp.task('bowserify-without-watch', function() { return compile_example_bowserify(); });
gulp.task('compile-browserify', function() { return watch_example_browserify(); });


