// Require Gulp & friends.
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css')
    concat = require('gulp-concat'),
    rename = require('gulp-rename')
    gutil = require('gulp-util'),
    serve = require('gulp-serve');

// Set up directories.
var sources = {
  'sass':{
    'in':'./src/sass/style.sass',
    'out':'./styles/',
    'opts':{
      'outputStyle': 'expanded'
    }
  },
  'jade':{
    'indexIn':'./src/jade/**/*.jade',
    'out':'./',
    'opts':{
      'locals': {},
      'pretty': true
    }
  }
}

gulp.task('sass', function(){
  gulp.src(sources.sass.in)
    .pipe(sass(sources.sass.opts)
    .on('error', sass.logError))
    .pipe(prefix({
      browsers: [
                      '> 1%',
                      'last 2 versions',
                      'firefox >= 4',
                      'safari 7',
                      'safari 8',
                      'IE 8',
                      'IE 9',
                      'IE 10',
                      'IE 11'
                  ],
      cascade: true
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(sources.sass.out))
    .pipe(minify())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(sources.sass.out));
});

gulp.task('jade', function(){
  gulp.src(sources.jade.indexIn)
		.pipe(jade(sources.jade.opts))
		.pipe(gulp.dest(sources.jade.out));
});

gulp.task('serve', serve('app'));

gulp.task('watch', function(){
	gulp.watch(['./src/sass/**/*.sass', './src/jade/**/*.jade'], ['sass','jade']);
});

gulp.task('default', ['sass','jade','serve','watch']);
