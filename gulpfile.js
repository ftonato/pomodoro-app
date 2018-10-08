const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');

gulp.task('css', () => {
  return gulp
    .src('src/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', cb => {
  pump(
    [
      gulp.src('src/js/*.js', { base: './' }),
      sourcemaps.init(),
      babel({
        presets: ['@babel/env']
      }),
      concat('main.min.js'),
      uglify(),
      sourcemaps.write('.'),
      gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('clean', () => {
  return gulp.src(['dist/css', 'dist/js'], { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task('default', gulp.series(['clean', 'css', 'js']));
