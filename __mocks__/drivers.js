const { resolve } = require("path");
const { Builder, By } = require("selenium-webdriver");
const { FileDetector } = require("selenium-webdriver/remote");

const dotenv = require("dotenv");
dotenv.config();
const d = new Date();
const testServerURL = "https://softberry.github.io/save-image-as/";

const dateStr = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

const USERNAME = process.env.BROWSERSTACK_USERNAME;
const AUTOMATE_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const browserstackURL = `https://${USERNAME}:${AUTOMATE_KEY}@hub-cloud.browserstack.com/wd/hub`;

// Input capabilities
const capabilities = {
  // name: buildName, // test name
  build: `Save Image As - Browser Test @  ${dateStr}`,
  //   "browserstack.sendKeys": true,
  "browserstack.selenium_version": "3.14.0",
  "browserstack.debug": true,
  "browserstack.networkLogs": true,
  "browserstack.console": "errors",
};

const windows10FirefoxLatest = {
  ...capabilities,
  os: "Windows",
  os_version: "10",
  resolution: "1920x1080",
  browserName: "Firefox",
  browser_version: "latest",
};

const windows10FirefoxLatest_1 = {
  ...windows10FirefoxLatest,
  browser_version: "latest - 1",
};

const windows10FirefoxLatest_2 = {
  ...windows10FirefoxLatest,
  browser_version: "latest - 2",
};

const oSCatalinaSafari_13 = {
  ...capabilities,
  os: "OS X",
  os_version: "Catalina",
  browserName: "Safari",
  browser_version: "13.1",
};

const getDriverFor = (testGroupName, driverCaps) => {
  const driver = new Builder()
    .forBrowser("chrome")
    .usingServer(browserstackURL)
    .withCapabilities({
      ...driverCaps,
      name: `Save Image As - Browser Test ${testGroupName}`,
    })
    .build();
  driver.setFileDetector(new FileDetector());
  return driver;
};
const drivers = () => ({
  windows10FirefoxLatest,
  windows10FirefoxLatest_1,
  windows10FirefoxLatest_2,
  oSCatalinaSafari_13,
});

const getFileInfo = async (driver, mockFileName, inputFileId, resultImgId) => {
  try {
    const mockFile = resolve(__dirname, mockFileName);

    const imageFile = await driver.findElement(By.id(inputFileId));
    const imageElement = await driver.findElement(By.id(resultImgId));
    const isImageFileDisplayed = await imageFile.isDisplayed();

    if (!isImageFileDisplayed) {
      return {
        data: "FILE_INPUT_NOT_DISPLAYED",
        width: -1,
        height: -1,
      };
    }
    await imageFile.sendKeys(mockFile);
    const data = await imageElement.getAttribute("src");
    const rect = await imageElement.getRect();

    return {
      data,
      ...rect,
    };
  } catch (err) {
    return {
      data: err,
      width: -1,
      height: -1,
    };
  }
};
const getTestCases = scopedDrivers => {
  const testsCases = Object.keys(scopedDrivers).map((src, i, array) => {
    return array.map(target => {
      const driver = scopedDrivers[src];
      driver.get(testServerURL);
      return {
        driver,
        mockFile: `../__mocks__/color-palette.${src.toLowerCase()}`,
        inputFileId: `imageFile${src}To${target}`,
        resultImgId: `result${src}To${target}`,
        data: `data:image/${src.toLowerCase()};base64`,
      };
    });
  });
  return {
    drivers: scopedDrivers,
    list: testsCases,
  };
};
module.exports = {
  drivers: drivers(),
  getFileInfo,
  getDriverFor,
  getTestCases,
};
