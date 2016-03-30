/**
 * Created by ssanchez on 28/03/16.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css');

gulp.task('css', function () {
    return gulp
        .src('./statics/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleancss({'debug': true}, function (details) {
            console.log('Original size: ' + details.stats.originalSize);
            console.log('Minified size: ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('./statics/css/'));
});

gulp.task('css:watch', function () {
    gulp.watch('./statics/css/*.scss', ['css'])
});