var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');

gulp.task('browserify', function() {
  var b = browserify({
    entries: './src/app.js',
    paths: ['./node_modules', './src/'],
    debug: true,
    transform: [babelify]
  });

  return b.bundle()
    .on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source('./src/js/app.js'))
        .pipe(rename('app.js'))

    .pipe(gulp.dest('./static/js/'));
});

gulp.task('default', ['browserify']);
