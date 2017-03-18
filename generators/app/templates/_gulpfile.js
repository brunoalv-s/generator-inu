var	pug 			= require('gulp-pug');
	gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	concat 			= require('gulp-concat'),
	cleanCSS 		= require('gulp-clean-css'),
	sourcemaps 		= require('gulp-sourcemaps'),
	browserSync		= require('browser-sync').create(),
	autoprefixer	= require('gulp-autoprefixer');

gulp.task('styles', function() {

	setTimeout(function() {
		gulp.src('src/scss/styles.scss')
			.pipe(sourcemaps.init())
			.pipe(sass())
			.on('error', function (err) {
				console.error('Error!', err.message);
			})
			.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(cleanCSS())
			.pipe(sourcemaps.write('../maps/'))
			.pipe(gulp.dest('dist/css/'))
			.pipe(browserSync.stream());
	}, 200);
});

gulp.task('scripts', function() {
	setTimeout(function() {
		gulp.src([
			'src/js/**/*.js'
			])
			.pipe(sourcemaps.init())
			.pipe(concat('scripts.js'))
			.pipe(sourcemaps.write('../maps/'))
			.pipe(gulp.dest('dist/js/'))
			.pipe(browserSync.stream());
	}, 200);
});

gulp.task('views', function buildHTML() {
  return gulp.src('src/views/*.pug')
		.pipe(sourcemaps.init())
		.pipe(pug())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('dist/'))
});

gulp.task('dev', function() {

	browserSync.init({
		open: false,
		server: {
			baseDir: 'dist'
		}
	});

	gulp.watch('src/scss/*.scss', ['styles']);
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/views/**/*.pug', ['views']);
	gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('build', ['styles', 'scripts', 'views']);

// Tarefa padrão para desenvolvimento.
gulp.task('default', ['build', 'dev'])
