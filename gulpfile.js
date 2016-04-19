/**
 * Created by ssanchez on 28/03/16.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglifyjs');

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

gulp.task('js', function () {
    return gulp
        .src([
            './statics/js/jquery-1.11.1.min.js',
            './statics/js/bootstrap.js',
            './statics/js/liveicons.js',
            './statics/js/icons.js',
            './statics/js/angular.min.js',
            './statics/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
            './statics/ng-scrollbars/dist/scrollbars.min.js',
            './statics/js/app.js',
            './statics/js/parallax.js',
            './statics/js/FBFactory.js',
            './statics/js/ngGallery.js',
            './statics/ng-droplet/dist/ng-droplet.min.js',
            './statics/angular-bootstrap/ui-bootstrap.min.js',
            './statics/angular-bootstrap/ui-bootstrap-tpls.min.js'
        ])
        .pipe(uglify('welkomiapp.js', {
            'mangle': false
        }))
        .pipe(gulp.dest('./statics/js/'))
});

gulp.task('css:watch', function () {
    gulp.watch('./statics/css/*.scss', ['css'])
});