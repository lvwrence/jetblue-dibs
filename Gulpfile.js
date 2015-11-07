var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('default', function () {
    browserify({entries: './src/home.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('home.js'))
        .pipe(gulp.dest('static/js'));

    browserify({entries: './src/subpage.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('subpage.js'))
        .pipe(gulp.dest('static/js'));
});
