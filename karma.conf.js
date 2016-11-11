// Karma configuration
// Generated on Mon Sep 26 2016 17:40:08 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs', 'es6-shim'],

    // list of files / patterns to load in the browser
    files: [
      'test-main.js', {
        pattern: 'web/**/*.js',
        included: false
      }, {
        pattern: 'test/mocks/**/*.js',
        included: true
      }, {
        pattern: 'test/**/*Spec.js',
        included: false
      }, {
        pattern: 'mockjax/*.js',
        included: false
      }, {
        pattern: 'test/**/*.json',
        included: false
      }
    ],

    // list of files to exclude
    exclude: [
      'web/js/main.js'
    ],
    reporters: ['progress', 'junit', 'sonarqubeUnit', 'coverage'],
    sonarQubeUnitReporter: {
      outputFile: 'reports/junit/ut_report.xml',
      useBrowserName: false
    },
    junitReporter: {
      outputFile: 'TEST-frontend-results.xml',
      outputDir: 'reports/junit',
    },
    coverageReporter: {
      dir: 'reports/coverage/',
      reporters: [
        // reporters not supporting the `file` property
        {
          type: 'html',
          subdir: 'report-html'
        }, {
          type: 'lcov',
          dir: 'reports',
          subdir: 'coverage'
        },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        {
          type: 'cobertura',
          subdir: '.',
          file: 'cobertura.xml'
        },
      ],
    },
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'web/js/components/**/*.js': ['coverage']
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
