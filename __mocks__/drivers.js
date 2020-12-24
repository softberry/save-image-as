const { resolve } = require("path");
const { Builder, By } = require("selenium-webdriver");
const { FileDetector } = require("selenium-webdriver/remote");

const dotenv = require("dotenv");
dotenv.config();
const d = new Date();

const dateStr = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
const buildName = `Save Image As - Browser Test ${dateStr}`;
const USERNAME = process.env.BROWSERSTACK_USERNAME;
const AUTOMATE_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const browserstackURL = `https://${USERNAME}:${AUTOMATE_KEY}@hub-cloud.browserstack.com/wd/hub`;
const testServerURL = "https://softberry.github.io/save-image-as/";
// Input capabilities
const capabilities = {
  os_version: "10",
  resolution: "1920x1080",
  browserName: "Firefox",
  browser_version: "latest",
  os: "Windows",
  name: buildName, // test name
  build: `Save Image As - Browser Test @  ${dateStr}`,
  //   "browserstack.sendKeys": true,
  "browserstack.debug": true,
  "browserstack.networkLogs": true,
};

const windows10FirefoxLatest = { ...capabilities };

const windows10FirefoxLatest_1 = {
  ...capabilities,
  browser_version: "latest - 1",
};

const windows10FirefoxLatest_2 = {
  ...capabilities,
  browser_version: "latest - 2",
};

const getDriverFor = driverCaps => {
  const driver = new Builder()
    .forBrowser("chrome")
    .usingServer(browserstackURL)
    .withCapabilities(driverCaps)
    .build();
  driver.setFileDetector(new FileDetector());
  return driver;
};
const drivers = () => ({
  windows10FirefoxLatest,
  windows10FirefoxLatest_1,
  windows10FirefoxLatest_2,
});

//const mockFile = resolve(__dirname, "./color-palette.png");
const getFileInfo = async (driver, mockFileName) => {
  try {
    const mockFile = resolve(__dirname, mockFileName);
    driver.get(testServerURL);
    const imageFile = await driver.findElement(By.id("imageFile"));
    const imageElement = await driver.findElement(By.id("result"));
    const isImageFileDisplayed = await imageFile.isDisplayed();

    if (!isImageFileDisplayed) {
      throw new Error("FILE_INPUT_NOT_DISPLAYED");
    }
    await imageFile.sendKeys(mockFile);
    const data = await imageElement.getAttribute("src");
    const rect = await imageElement.getRect();

    return {
      data,
      ...rect,
    };
  } catch (err) {
    return err;
  }
};

module.exports = {
  drivers: drivers(),
  getFileInfo,
  getDriverFor,
};
