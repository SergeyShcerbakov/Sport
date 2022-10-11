const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const { series } = require('gulp');

function defaultTask(cb) {
    // place code for your default task here
    cb();
};

function include() {
    return gulp
    .src(['app/index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dest/'));
};

function buildStyles() {
    return gulp
        .src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
};

function cssNano() {
    return gulp
        .src('app/css/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./dest/css'));
};

function imgmin() {
    return gulp
        .src('./app/images/**/*.*')
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 80, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ])
        )
        .pipe(gulp.dest("./dest/images"));
};

function fonts() {
    return gulp.src('app/fonts/*.*')
        .pipe(gulp.dest('dest/fonts'));
};

exports.html = include;
exports.css = buildStyles;
exports.nano = cssNano;
exports.img = imgmin;
exports.font = fonts;

exports.dev = series(
    include,
    buildStyles,
    cssNano,
    imgmin,
    fonts
);