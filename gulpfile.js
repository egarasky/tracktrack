var gulp = require('gulp');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('clean', function () {
    return gulp.src(['webapp/dist', 'webapp/build'], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('copy-html', ['clean'], function(){
   return gulp.src('webapp/index.html')
       .pipe(gulp.dest('webapp/dist'));
});

var lib = [
    'stompjs/lib/stomp.js',
    'sockjs-client/dist/sockjs.js',
    'bootstrap/dist/js/bootstrap.js'
].map(function (path) {
    return 'node_modules/' + path;
});

gulp.task('copy-js-lib', ['clean'], function () {
    //noinspection JSUnresolvedFunction
    return gulp.src(lib)
        .pipe(gulp.dest('webapp/build/lib'))
        .pipe(sourcemaps.init())
        .pipe(concat('build.lib.js'))//concat
        .pipe(gulp.dest('webapp/build'))
        .pipe(uglify())//minify
        .pipe(sourcemaps.write())//end source map
        .pipe(rename('build.lib.min.js'))
        .pipe(gulp.dest('webapp/build/dist/lib'));
});

gulp.task('default', ['copy-js-lib', 'copy-html']);

