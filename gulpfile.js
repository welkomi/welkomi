/**
 * Created by ssanchez on 28/03/16.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('css', function () {
    return gulp
        .src('./statics/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./statics/css/'));
});

gulp.task('css:watch', function () {
    gulp.watch('./statics/css/*.scss', ['css'])
});