const { resolve } = require("path");
const { Builder, By } = require("selenium-webdriver");
const { FileDetector } = require("selenium-webdriver/remote");

const dotenv = require("dotenv");
dotenv.config();

USERNAME = process.env.BROWSERSTACK_USERNAME;
AUTOMATE_KEY = process.env.BROWSERSTACK_ACCESS_KEY;
const browserstackURL =
  "https://" +
  USERNAME +
  ":" +
  AUTOMATE_KEY +
  "@hub-cloud.browserstack.com/wd/hub";

// Input capabilities
const capabilities = {
  os_version: "10",
  resolution: "1920x1080",
  browserName: "Firefox",
  browser_version: "latest",
  os: "Windows",
  name: "BStack-[NodeJS] Sample Test", // test name
  build: "BStack Build Number 1",
  //   "browserstack.sendKeys": true,
  "browserstack.debug": true,
  "browserstack.networkLogs": true,
};

const driver = new Builder()
  .forBrowser("chrome")
  .usingServer(browserstackURL)
  .withCapabilities(capabilities)
  .build();
driver.setFileDetector(new FileDetector());

const basicTest = async () => {
  try {
    const mockFile = resolve(__dirname, "./color-palette.png");

    await driver.get("https://softberry.github.io/save-image-as/");

    const imageFile = await driver.findElement(By.id("imageFile"));
    const d = await imageFile.isDisplayed();
    const d1 = await imageFile.sendKeys(mockFile);
    console.log("§§§§§", d, d1);
    const resultImg = await driver.findElement(By.css("#result"));
    const src = await resultImg.getAttribute("src");
    if (src.startsWith("data:image/jpeg;base64")) {
      console.log("Success");
    } else {
      console.log("Error");
    }
    (await driver).quit();
  } catch (err) {
    console.log(err);
    (await driver).quit();
  }
};

basicTest();
