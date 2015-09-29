// Include gulp
var gulp = require('gulp');

var react = require('gulp-react'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    less = require('gulp-less'),
    plumber = require("gulp-plumber");
var uglify = require('gulp-uglify');

var browserSync = require("browser-sync");

gulp.task('browserify', function () {
    return gulp.src('src/main.js')
        .pipe(plumber())
        .pipe(browserify({transform: "reactify"}))
        .pipe(concat('main.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copyindex', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('lint', function () {
    gulp.src(['src/*/*.js', 'src/*.js'])
        .pipe(plumber())
        .pipe(react())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
    //.pipe(jshint.reporter('fail'));
});

gulp.task('less', function () {
    return gulp.src('src/less/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function () {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function () {
    gulp.watch('src/images/*', ['images', browserSync.reload]);
    gulp.watch('src/less/*.less', ['less', browserSync.reload]);
    gulp.watch('src/index.html', ['copyindex', browserSync.reload]);
    gulp.watch(['src/*/*.js', 'src/*/*/*.js', 'src/*.js'], ['lint', 'browserify', browserSync.reload]);
});

// start sync server
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
});


gulp.task('default', ['lint', 'images', 'less', 'browserify', 'copyindex']);
gulp.task('watch_task', ['browser-sync', 'default', 'watch']);