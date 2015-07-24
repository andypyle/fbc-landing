// Require Gulp & friends.
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    jade = require('gulp-jade'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');

// Set up directories.
var sources = {
  'sass':{
    'in':'./site/src/sass/style.sass',
    'out':'./site/styles/',
    'opts':{
      'outputStyle': 'expanded'
    }
  },
  'jade':{
    'in':'./site/src/jade/**/*.jade',
    'out':'./site',
    'opts':{
      'locals': {},
      'pretty': true
    }
  },
  'js':{
    'in':'./site/js/*.js'
  },
  'img':{
    'in':'./site/img/*'
  },
  'build':{
    'css':'./build/styles',
    'js':'./build/js',
    'html':'./build',
    'img':'./build/img'
  }
}

// JavaScript linting
gulp.task('jshint', function() {
  return gulp.src(sources.js.in)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
/// End JS linting


// SASS compiling
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
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(sources.sass.out))
    .pipe(gulp.dest(sources.build.css));
});
/// End SASS


// Jade compiling
gulp.task('jade', function(){
  gulp.src(sources.jade.in)
		.pipe(jade(sources.jade.opts))
		.pipe(gulp.dest(sources.jade.out))
    .pipe(gulp.dest(sources.build.html));
});
/// End jade compiling


// JavaScript minify
gulp.task('scripts', function() {
  return browserify('./site/js/main.js')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(sources.build.js));
});
/// End JS minify


// Image optimization
gulp.task('images', function() {
  gulp.src(sources.img.in)
    .pipe(imagemin())
    .pipe(gulp.dest(sources.build.img));
});
// End image optimization


// Build 
gulp.task('build', ['jshint', 'sass', 'scripts', 'images', 'jade']);
// End build


//gulp.task('serve', serve('site'));

gulp.task('watch', function(){
	gulp.watch(['./site/src/sass/**/*.sass', './site/src/jade/**/*.jade'], ['sass','jade']);
  gulp.watch('site/js/*.js', ['jshint']);
});

gulp.task('default', ['sass','jade','jshint','watch']);
