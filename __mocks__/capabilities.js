const d = new Date();
const dateStr = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

const basicCapabilities = {
  // name: buildName, // test name
  build: `Save Image As - Browser Test @  ${dateStr}`,
  //   "browserstack.sendKeys": true,
  "browserstack.selenium_version": "3.14.0",
  "browserstack.debug": true,
  "browserstack.networkLogs": true,
  "browserstack.console": "errors",
};

const windows10FirefoxLatest = {
  ...basicCapabilities,
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
  ...basicCapabilities,
  os: "OS X",
  os_version: "Catalina",
  browserName: "Safari",
  browser_version: "13.1",
};

const windows8ChromeLatest_2 = {
  ...basicCapabilities,
  os: "Windows",
  os_version: "8",
  browserName: "Chrome",
  browser_version: "latest - 2",
};

const capabilities = () => ({
  windows10FirefoxLatest,
  windows10FirefoxLatest_1,
  windows10FirefoxLatest_2,
  oSCatalinaSafari_13,
  windows8ChromeLatest_2,
});

module.exports.capabilities = capabilities;
