
var syntax        = 'scss'; // Syntax: sass or scss;

var     gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
	    imagemin = require('gulp-imagemin');
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rigger 		  = require('gulp-rigger'),
		rsync         = require('gulp-rsync');


var path = {
    build: { // Куда складывать готовые файлы после сборки
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/css/fonts/'
    },
    src: { // Откуда брать исходники
        html: 'src/*.html',
        js: 'src/js/*.js',
        css: 'src/scss/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { // За изменениями каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/css/fonts/**/*.*'
    },
    clean: './build'
};


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false,
		// open: false,
		// online: false,
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) // Выберем файлы по нужному пути
        .pipe(rigger()) // Прогоним через rigger
        .pipe(gulp.dest(path.build.html)); // Переместим их в папку build
});


gulp.task('css:build', function () {
    gulp.src(path.src.css) // Выберем наш main.scss
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js:build', function() {
	return gulp.src([
		// 'src/libs/jquery/dist/jquery.min.js',
		'src/js/index.js', // Always at the end
		])
	// .pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest(path.build.js))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({ // Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) // Переместим в build
        .pipe(browserSync.reload({ stream: true }))
});



gulp.task('watch', ['html:build', 'css:build', 'js:build', 'image:build', 'browser-sync'], function() {
	gulp.watch([path.watch.css], ['css:build']);
	gulp.watch([path.watch.js], ['js:build']);
    gulp.watch([path.watch.img], ['image:build']);
    gulp.watch([path.watch.html], ['html:build']);
    gulp.watch([path.watch.html],  browserSync.reload)
});


gulp.task('default', ['watch']);

