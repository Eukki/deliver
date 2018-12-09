var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    cssnano = require('gulp-cssnano'),
    less = require('gulp-less'),
    rimraf = require('rimraf'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    gulpUtil = require('gulp-util');



var path = {
    build: { // Куда складывать готовые файлы после сборки
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/i/',
        fonts: 'build/css/fonts/'
    },
    src: { // Откуда брать исходники
        html: 'src/*.html',
        js: 'src/js/*.js',
        css: 'src/css/style.less',
        img: 'src/i/**/*.*',
        fonts: 'src/css/fonts/**/*.*'
    },
    watch: { // За изменениями каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.less',
        img: 'src/i/**/*.*',
        fonts: 'src/css/fonts/**/*.*'
    },
    clean: './build'
};


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) // Выберем файлы по нужному пути
        .pipe(rigger().on('error', gulpUtil.log)) // Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) // Переместим их в папку build
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('js:build', function () {
    gulp.src(path.src.js) // Выберем файлы по нужному пути
        .pipe(rigger().on('error', gulpUtil.log)) // Прогоним через rigger
        .pipe(uglify().on('error', gulpUtil.log)) // Сожмем js
        .pipe(gulp.dest(path.build.js)) // Переместим готовый файл в build
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('css:build', function () {
    gulp.src(path.src.css) // Выберем наш style.less
        .pipe(less().on('error', gulpUtil.log)) // Скомпилируем
        .pipe(prefixer().on('error', gulpUtil.log)) // Добавим вендорные префиксы
        .pipe(cssnano({zindex: false})) // Сожмем
        .pipe(gulp.dest(path.build.css)) // Переместим в build
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('image:build', function () {
    gulp.src(path.src.img) // Выберем наши картинки
        .pipe(imagemin({ // Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) // Переместим в build
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts)) // Переместим шрифты в build
        .pipe(browserSync.reload({stream: true}))
});


gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['watch', 'browser-sync']);

