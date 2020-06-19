/* eslint-disable */
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const del = require('del');
const watch = require('gulp-watch');
const gutil = require('gulp-util');
const rename = require('gulp-rename');

gulp.task('compile', function () {
  return gulp.src('src/canvas-text-wrapper.js')
    .pipe(eslint())
    .pipe(babel())
    .pipe(uglify({
      compress: {
        drop_console: false
      }
    }).on('error', gutil.log))
    .pipe(rename('canvas-text-wrapper-min.js'))
    .pipe(gulp.dest('build/'));
});

gulp.task('clean', function () {
  return del('build/');
});

// Watch
gulp.task('watch', function () {
  gulp.watch('src/canvas-text-wrapper.js', gulp.series('compile'));
});

// Default
gulp.task('default', gulp.series('clean', 'compile', 'watch'));
