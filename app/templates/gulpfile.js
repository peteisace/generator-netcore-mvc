var gulp = require('gulp');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var cssMin = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');

// we want some sass...
gulp.task('sass', function() {
    // fetch the sass files
    return gulp.src('publishExclude/sass/styles.scss')
        .pipe(sass())
        .pipe(sourceMaps.init())
        .pipe(cssMin())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('wwwroot/css/'));
});

// we also want to clean the javascript
gulp.task('browser-js', function(callback) {
    // return the .js files
    pump([
        gulp.src('publishExclude/js/*.js'),
        sourceMaps.init(),
        uglify(),
        sourceMaps.write(),
        rename('script.js'),
        gulp.dest('wwwroot/scripts')      
    ], callback);        
});

// and now set up the watches
gulp.task('watch-scripts', function() {
    gulp.watch('publishExclude/sass/*.scss', ['sass']);
    gulp.watch('publishExclude/js/*.js', ['browser-js']);
});

// let's have these guys as the default.
gulp.task('default', ['sass', 'browser-js']);
