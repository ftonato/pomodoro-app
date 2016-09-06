const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const compiler = require('google-closure-compiler-js').gulp();

gulp.task('css', function() {
  return gulp.src('src/css/main.css')
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifycss())
  .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js', {base: './'})
  .pipe(compiler({
    languageIn: 'ECMASCRIPT6',
    languageOut: 'ECMASCRIPT5',
    compilationLevel: 'SIMPLE',
    jsOutputFile: 'main.min.js',
    createSourceMap: true,
  }))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js'], {read: false})
  .pipe(clean());
});

gulp.task('default', ['clean'], function() {
  gulp.run('css', 'js');
});
