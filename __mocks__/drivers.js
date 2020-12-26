const { resolve } = require("path");
const { Builder, By } = require("selenium-webdriver");
const { FileDetector } = require("selenium-webdriver/remote");

const dotenv = require("dotenv");
const { capabilities } = require("./capabilities");
const { strict } = require("assert");
const { stringLiteral } = require("@babel/types");

dotenv.config();

const testServerURL = "https://softberry.github.io/save-image-as/";

const USERNAME = process.env.BROWSERSTACK_USERNAME;
const AUTOMATE_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const browserstackURL = `https://${USERNAME}:${AUTOMATE_KEY}@hub-cloud.browserstack.com/wd/hub`;

// Input capabilities

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

const getFileInfo = async (driver, mockFileName, inputFileId, resultImgId) => {
  try {
    const mockFile = resolve(__dirname, mockFileName);

    const imageFile = await driver.findElement(By.id(inputFileId));
    const imageElement = await driver.findElement(By.id(resultImgId));
    const isImageFileDisplayed = await imageFile.isDisplayed();

    if (!imageFile) throw Error("FILE_INPUT_NOT_FOUNT");
    if (!imageElement) throw Error("IMG_ELEMENT_NOT_FOUNT");
    if (!isImageFileDisplayed) throw Error("FILE_INPUT_NOT_DISPLAYED");

    await imageFile.sendKeys(mockFile);
    const data = await imageElement.getAttribute("src");
    if (typeof data !== "string") throw Error("IMG_ELEMENT_SRC_NOT_AVAILABLE");
    const rect = await imageElement.getRect();
    if (typeof rect === undefined) throw Error("IMG_ELEMENT_RECT_UNDEFINED");
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
  capabilities: capabilities(),
  getFileInfo,
  getDriverFor,
  getTestCases,
};
