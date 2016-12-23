var gulp = require('gulp'),
    html2js = require('gulp-html2js'),
    uglify = require('gulp-uglify'), //js minifiy
    rename = require('gulp-rename'), //rename
    cleanCSS = require('gulp-clean-css'), //css minify
    concat = require('gulp-concat'), //concat 合并文件
    imagemin = require('gulp-imagemin'); //image minifiy



// html2js
gulp.task('html.js', function() {
    gulp.src(['app/components/**/*.html', 'app/pages/*/*.html'])
        .pipe(html2js('templates.js', {
            adapter: 'angular',
            base: 'templates',
            name: 'main'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});


//mini css
gulp.task('cssmin', function() {
    return gulp.src('css/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('css'));
});



//mini js
gulp.task('js', function() {
    return gulp.src('pages/*/*.js')
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
});

//mini js
gulp.task('js2', function() {
    return gulp.src('app/pages/*/*/*/.js')
        .pipe(concat('directives.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// mini image
gulp.task('img', function() {
    var format = ['root/images/*', 'root/images/**/*'];
    return gulp.src('assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('serviceMin', function() {
    return gulp.src('assets/js/services.js')
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//默认命令，在cmd中输入gulp
gulp.task('default', function() {
    //gulp.start('img');
    gulp.start(['js', 'js2', 'cssmin', 'html.js']);
});

gulp.watch(['app/pages/*/*.js'], ['js']);
gulp.watch(['app/components/**/*.js'], ['js2']);
gulp.watch(['assets/css/*/*.css'], ['cssmin']);
gulp.watch(['app/components/**/*.html', 'app/pages/*/*.html'], ['html.js']);

