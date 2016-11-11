var fs = require('fs');

var seleniumWebdriver = require('selenium-webdriver');
var assert = require('assert');
module.exports = function() {

  this.Given(/^I am on the component main page$/, function() {
    return this.driver.get('http://frontend:8001');



  });

  this.Then(/^I should see the component with text "([^"]*)"$/, function(expectedText) {
    return this.driver.wait(this.until.elementLocated(this.By.css('ringette-web.oj-complete h1')), 5 * 1000)
      .then(function(elm) {
        return elm.getText();
      })
      .then(function(text) {
        assert.equal(text, expectedText);
        return text;
      });


  });

};
