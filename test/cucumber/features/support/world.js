'use strict';

var fs = require('fs');
var webdriver = require('selenium-webdriver');
var getDriver = function() {
  return new webdriver.Builder()
    .forBrowser('firefox')
    .build();

};
var driver = getDriver();
var browser = "firefox";
var World = function World(options) {
  console.log('selenium options:' + JSON.stringify(options, null, 4));
  var defaultTimeout = 20000;
  var screenshotPath = "screenshots";
  var self = this;
  browser = this.browser = options.browser || "firefox";
  this.webdriver = webdriver;
  this.driver = getDriver();
  this.By = webdriver.By;
  this.until = webdriver.until;

  this.keys = {
    "Shift": self.webdriver.Key.SHIFT,
    "Tab": self.webdriver.Key.TAB,
    "Down Arrow": self.webdriver.Key.ARROW_DOWN,
    "Up Arrow": self.webdriver.Key.ARROW_UP,
    "Shift-Tab": self.webdriver.Key.chord(self.webdriver.Key.SHIFT, self.webdriver.Key.TAB),
    "F2": self.webdriver.Key.F2,
    "Enter": self.webdriver.Key.ENTER,
    "Escape": self.webdriver.Key.ESCAPE,
    "Right Arrow": self.webdriver.Key.ARROW_RIGHT,
    "Left Arrow": self.webdriver.Key.ARROW_LEFT
  }
  this.functionMap = {

  };

  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath);
  }

  this.waitFor = function(cssLocator, timeout) {
    var waitTimeout = timeout || defaultTimeout;
    return driver.wait(function() {
      return driver.isElementPresent({
        css: cssLocator
      });
    }, waitTimeout);
  };


};


module.exports = function() {
  this.World = World;

  this.driver = driver;

  this.browser = browser;
};
