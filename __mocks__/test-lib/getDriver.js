const { Builder } = require("selenium-webdriver");
const { FileDetector } = require("selenium-webdriver/remote");

const dotenv = require("dotenv");
dotenv.config();
const USERNAME = process.env.BROWSERSTACK_USERNAME;
const AUTOMATE_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const browserstackURL = `https://${USERNAME}:${AUTOMATE_KEY}@hub-cloud.browserstack.com/wd/hub`;

/**
 *
 * @param {string} testGroupName
 * @param {object} driverCaps
 */
const getDriver = (browser, driverCaps) => {
  const driver = new Builder()
    .forBrowser(browser)
    .usingServer(browserstackURL)
    .withCapabilities({
      ...driverCaps,
      name: `Save Image As - Browser Test ${driverCaps.browserName}`,
    })
    .build();
  driver.setFileDetector(new FileDetector());
  return driver;
};

module.exports.getDriver = getDriver;
