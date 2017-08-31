var gulp = require('gulp');
var sass = require('gulp-sass'); // sass工具
var rename = require("gulp-rename"); // 重命名
var cleanCSS = require('gulp-clean-css'); // css压缩
var imagemin = require('gulp-imagemin'); // 压缩图片
var imageResize = require('gulp-image-resize'); // 剪裁图片
var concat = require('gulp-concat'); // 合并js
var uglify = require('gulp-uglify'); // 压缩js
var browserSync = require("browser-sync").create(); // 浏览器自动更新
var argv = require('yargs').argv; // cli中指定参数

// 源
var _modules = './node_modules/',
    _scss = './src/scss/main.scss';
// 输出
var _css = './assets/css/';

// 编译和压缩scss为main.css
gulp.task('sass', function () {
    return gulp.src(_scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS()) // 压缩css
        .pipe(gulp.dest(_css));
});

// 图片压缩
gulp.task('images', function() {
    return gulp.src('src/images/*/*')
        .pipe(imageResize({
            percentage: 50
        }))
        .pipe(imagemin([
            imagemin.jpegtran({
                progressive: true,
            }),
        ]))
        .pipe(gulp.dest('assets/images'));
});

// 合并并且压缩js
gulp.task('js', function () {
    return gulp.src(require('./src/js/index.js'))
        .pipe(concat('main.js'))
        .pipe(uglify()) // 压缩js
        .pipe(gulp.dest('./assets/js/'));
});

// 监听scss文件变化,配置浏览器自动更新
gulp.task('default', ['sass'], function () {
    browserSync.init({
        proxy: 'http://localhost:2368/'
    });
    gulp.watch(['./src/scss/*.scss', './src/scss/*/*.scss', './src/js/*.js'], ['sass', 'js']);
    gulp.watch(_css + 'main.css').on('change', browserSync.reload);
    gulp.watch(['./*.hbs', 'partials/*.hbs', 'partials/*/*.hbs']).on('change', browserSync.reload);
});