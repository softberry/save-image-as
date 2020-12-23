console.log(process.env);
const webdriver = require("selenium-webdriver");
const browserstackLocal = process.env.BROWSERSTACK_LOCAL;
const browserstackLocalIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER;
// const dotenv = require("dotenv");
// dotenv.config();
// TODO: uninstall dotenv

var browserstackURL = process.env.BS_URL;

// Input capabilities
var capabilities = {
  "browserstack.local": "true",
  "browserstack.localIdentifier": browserstackLocalIdentifier,
  os: "Windows",
  os_version: "10",
  browserName: "Chrome",
  browser_version: "80",

  name: "save-image-as: Basic Test",
};

var driver = new webdriver.Builder().usingServer(browserstackURL).withCapabilities(capabilities).build();

driver.get("http://www.google.com").then(function () {
  driver
    .findElement(webdriver.By.name("q"))
    .sendKeys("BrowserStack")
    .then(function () {
      driver.getTitle().then(function (title) {
        console.log(title);
        driver.quit();
      });
    });
});
