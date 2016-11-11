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
var Server = require('karma').Server;
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
    port: 8001,
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



gulp.task('lint', function() {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['src/**/*.js', '!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    .pipe(eslint.format('checkstyle', fs.createWriteStream(path.join(__dirname, 'reports', 'checkstyle.xml'))))
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('copy', ['lint', 'copyCSS', 'copyComponents', 'sass'], function(done) {

  done();
});



var postprocessLCOV = function() {
  return gulp.src(['reports/coverage/lcov.info'])
    .pipe(replace('SF:/usr/src/app/web/js', 'SF:src'))
    .pipe(gulp.dest('reports'));
};

/**
 * Run test once and exit.
 * Create coverage reports.
 */
gulp.task('test', ['lint', 'copyCSS', 'copyComponents', 'sass'], function() {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, postprocessLCOV).start();
});

gulp.task('default', ['serve']);
