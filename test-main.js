var allTestFiles = []
var TEST_REGEXP = /(spec|test)\.js$/i

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '')
    allTestFiles.push(normalizedTestModule)
  }
})

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,
  paths:
  //injector:mainReleasePaths
  {
    'knockout': 'web/js/libs/knockout/knockout-3.4.0.debug',
    'jquery': 'web/js/libs/jquery/jquery-3.1.0',
    'jqueryui-amd': 'web/js/libs/jquery/jqueryui-amd-1.12.0',
    'promise': 'web/js/libs/es6-promise/es6-promise',
    'hammerjs': 'web/js/libs/hammer/hammer-2.0.8',
    'ojdnd': 'web/js/libs/dnd-polyfill/dnd-polyfill-1.0.0',
    'ojs': 'web/js/libs/oj/v2.2.0/debug',
    'ojL10n': 'web/js/libs/oj/v2.2.0/ojL10n',
    'ojtranslations': 'web/js/libs/oj/v2.2.0/resources',
    'text': 'web/js/libs/require/text',
    'signals': 'web/js/libs/js-signals/signals',
    'css': 'web/js/libs/require-css/css.min',
    'components': 'web/js/components',
    

    'mockjax': 'mockjax/jquery.mockjax'

  },
  // Shim configurations for modules that do not expose AMD
  shim: {
    'jquery': {
      exports: ['jQuery', '$']
    },
    'jqueryui': {
      deps: ['jquery']
    },
    'mockjax': {
      deps: ['jquery']
    }
  }
})
