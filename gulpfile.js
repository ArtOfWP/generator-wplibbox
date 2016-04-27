var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var watch = require('gulp-watch');

gulp.task('jasmin', function () {
gulp.src('spec/**/*Spec.js')
  // gulp-jasmine works on filepaths so you can't have any plugins before it
  .pipe(jasmine({
    errorOnFail: false
  }))
});

gulp.task("test", function() {
  watch(["generators/**/*.js", "spec/**/*Spec.js"], function() {
    gulp.start("jasmin");
  });
});
