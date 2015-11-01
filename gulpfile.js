var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var prompt = require('gulp-prompt');


require('./gulp/amd');
require('./gulp/browserify');
require('./gulp/karma');

/**
 * 'Build task'
 * Will build cookie.es6.js library only
 */
gulp.task('build', function () {
    return gulp.src('source/cookie.es6.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['babel-preset-es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});


gulp.task('amd', ['compile-amd']);
gulp.task('browserify', ['compile-browserify']);
gulp.task('test', ['karma']);


gulp.task('default', function(){
    gulp.src('gulpfile.js')
        .pipe(prompt.prompt({
            type: 'checkbox',
            name: 'tasks',
            message: 'Which tasks to run? (use "space" key to select tasks)',
            choices: ['browserify', 'amd', 'test']
        }, function(res){
            res.tasks.forEach(function(task) {
                gulp.start(task);
            });
        }));
});
