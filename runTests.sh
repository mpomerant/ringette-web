#!/usr/bin/env bash
rm -rf /usr/src/app/reports/cucumber/
mkdir /usr/src/app/reports/cucumber/
#SELENIUM_REMOTE_URL=http://selenium-ff:4444/wd/hub SELENIUM_BROWSER=firefox ./node_modules/.bin/cucumber-js test/cucumber/features --format json:/usr/src/app/reports/cucumber-firefox.json  --world-parameters '{"browser": "firefox"}'
SELENIUM_REMOTE_URL=http://selenium-ch:4444/wd/hub SELENIUM_BROWSER=chrome ./node_modules/.bin/cucumber-js test/cucumber/features --format json:/usr/src/app/reports/cucumber/cucumber-report-chrome.json  --world-parameters '{"browser": "chrome"}'
