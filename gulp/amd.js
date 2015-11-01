var gulp = require('gulp');
var babel = require('gulp-babel');
var shell = require('gulp-shell');

gulp.task('es6-to-common', function () {
    return gulp.src('source/*.es6.js')
        .pipe(babel({
            presets: ['babel-preset-es2015']
        }))
        .pipe(gulp.dest('./example/amd/common'));
});

gulp.task('common-to-amd', ['es6-to-common'], shell.task([
    'node node_modules/requirejs/bin/r.js -convert example/amd/common/ example/amd'
]));

gulp.task('compile-amd', ['common-to-amd']);