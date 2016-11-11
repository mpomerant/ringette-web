module.exports = function() {

  this.registerHandler('AfterFeatures', function(event, callback) {
    var reporter = require('cucumber-html-reporter');
    var reportFileJson = 'reports/cucumber/cucumber-report-' + process.env.SELENIUM_BROWSER + '.json';
    var reportFileHtml = 'reports/cucumber/cucumber-report-' + process.env.SELENIUM_BROWSER + '.html';
    var options = {
      theme: 'simple',
      jsonFile: reportFileJson,
      output: reportFileHtml,
      reportSuiteAsScenarios: true,
      launchReport: true
    };

    reporter.generate(options);

    //to generate consodilated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`. More info is available in `options` section below.

    callback();
  });


  this.After(function(scenario) {
    // Assuming this.driver is a selenium webdriver
    return this.driver.takeScreenshot().then(function(buffer) {
      return scenario.attach(new Buffer(buffer, 'base64'), 'image/png');
    });
  });



};
