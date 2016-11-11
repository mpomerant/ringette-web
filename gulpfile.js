var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var changed = require('gulp-changed');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var header = require('gulp-header');
var eslint = require('gulp-eslint');
var path = require('path');
var fs = require('fs');
var replace = require('gulp-replace');

var d = new Date();
var fullYear = d.getFullYear();

var banner = ['/**',
  '* Copyright (c) 2014, <%= year %>, Oracle and/or its affiliates.',
  '* The Universal Permissive License (UPL), Version 1.0',
  '*/',
  ''
].join('\n');

var bannerHtml = ['<!--',
  'Copyright (c) 2014, <%= year %>, Oracle and/or its affiliates.',
  'The Universal Permissive License (UPL), Version 1.0',
  '-->',
  ''
].join('\n');



gulp.task('sass', function() {
  return gulp.src(['./src/components/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['./web/scss/oj/v2.2.0/utilities'],
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(header(banner, {
      year: fullYear
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./web/js/components'));

});

gulp.task('sass:watch', function() {
  gulp.watch('src/**/*/*.scss', ['sass']);
});



var cors = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Headers', 'headers_you_want_to_accept');
  next();
};

var test1 = function(req, res, next) {
  console.log('hello');
  //res.setHeader('Access-Control-Allow-Headers', 'headers_you_want_to_accept');
  next();
};

var proxy = require('http-proxy-middleware');
gulp.task('connectTest', function() {
  connect.server({
    name: 'Test App',
    root: 'web',
    port: 80,
    middleware: function(connect, opt) {
      return [proxy('/api', {
        target: 'http://localhost:3000',
        changeOrigin: false
      }), cors];
    },
    livereload: true
  });
});

gulp.task('copyTemplates', function() {
  return gulp.src(['./template/**/*'])
    .pipe(gulp.dest('web'))
    .pipe(connect.reload());
});

gulp.task('copyComponentsHtml', function() {
  var DEST = 'web/js/components';



  return gulp.src(['!src/components/**/*/*.scss', 'src/components/**/*.html'])
    .pipe(changed(DEST))
    .pipe(header(bannerHtml, {
      year: fullYear
    }))
    .pipe(gulp.dest(DEST))
    .pipe(connect.reload());

});



gulp.task('copyComponentsJs', function() {
  var DEST = 'web/js/components';
  return gulp.src(['!src/components/**/*/*.scss', 'src/components/**/*.js'])
    .pipe(changed(DEST))
    .pipe(header(banner, {
      year: fullYear
    }))
    .pipe(gulp.dest(DEST))
    .pipe(connect.reload());

});

gulp.task('copyComponentsOther', [], function() {
  var DEST = 'web/js/components';
  return gulp.src(['!src/components/**/*.{scss,js,html}', 'src/components/**/*.*'])
    .pipe(changed(DEST))
    .pipe(gulp.dest(DEST))
    .pipe(connect.reload());
})
gulp.task('copyComponents', ['copyTemplates', 'copyComponentsJs', 'copyComponentsHtml', 'copyComponentsOther'], function() {

});

gulp.task('stageTemplates', function() {

  var watcher = gulp.watch(['template/**/*'], ['copyTemplates']);
  watcher.on('change', function() {

  });

});
gulp.task('stageComponents', ['stageComponentsJs', 'stageComponentsJson', 'stageComponentsHtml'], function() {


  var watcher = gulp.watch(['src/components/**/*', '!src/components/**/*.{scss,js,html,json}'], ['copyComponentsOther']);
  watcher.on('change', function() {

  });

  watcher.on('add', function() {

  });
});

gulp.task('stageComponentsJs', function() {


  var watcher = gulp.watch(['src/components/**/*.js'], ['copyComponentsJs']);
  watcher.on('change', function() {

  });


});

gulp.task('stageComponentsJson', function() {
  var watcher = gulp.watch(['src/components/**/*.json'], ['copyComponentsOther']);
  watcher.on('change', function() {


  });


});

gulp.task('stageComponentsHtml', function() {


  var watcher = gulp.watch(['src/components/**/*.html'], ['copyComponentsHtml']);
  watcher.on('change', function() {


  });


});

gulp.task('stageSass', function() {

  return watch('web/**/*/*.css', {
      ignoreInitial: false
    })
    .pipe(connect.reload());

});

gulp.task('copyCSS', function() {
  var DEST = 'web/css';
  return gulp.src('./node_modules/oraclejet-templates/basic/web/css/**/*')
    .pipe(changed(DEST))
    .pipe(gulp.dest(DEST));

});
gulp.task('stageCSS', function() {

  return watch('./node_modules/oraclejet-templates/basic/web/css/**/*', {
      ignoreInitial: false
    })
    .pipe(gulp.dest('web/css')).pipe(connect.reload());

});
gulp.task('serve', ['copy', 'stageTemplates', 'stageComponents', 'stageCSS', 'sass:watch', 'stageSass', 'connectTest']);




gulp.task('copy', [ 'copyCSS', 'copyComponents', 'sass'], function(done) {

  done();
});



gulp.task('default', ['serve']);
