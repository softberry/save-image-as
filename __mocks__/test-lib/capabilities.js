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
// FireFox
const windows10Firefox = {
  ...basicCapabilities,
  os: "Windows",
  os_version: "10",
  resolution: "1920x1080",
  browserName: "Firefox",
  browser_version: "latest - 2",
};
const windows7Firefox = {
  ...basicCapabilities,
  os: "Windows",
  os_version: "7",
  resolution: "1920x1080",
  browserName: "Firefox",
  browser_version: "latest - 2",
};
const osCatalinaFirefox = {
  ...basicCapabilities,
  os: "OS X",
  os_version: "Catalina",
  browserName: "Firefox",
  browser_version: "latest - 2",
};
// Safari
const oSCatalinaSafari_13 = {
  ...basicCapabilities,
  os: "OS X",
  os_version: "Catalina",
  browserName: "Safari",
  browser_version: "13.1",
};
const oSBigSurSafari_14 = {
  ...basicCapabilities,
  os: "OS X",
  os_version: "Big Sur",
  browserName: "Safari",
  browser_version: "14.0",
};
// Chrome
const windows10Chrome = {
  ...basicCapabilities,
  os: "Windows",
  os_version: "10",
  browserName: "Chrome",
  browser_version: "latest - 2",
};
const windows7Chrome = {
  ...basicCapabilities,
  os: "Windows",
  os_version: "7",
  browserName: "Chrome",
  browser_version: "latest - 2",
};
const osCatalinaChrome = {
  ...basicCapabilities,
  os: "OS X",
  os_version: "Catalina",
  browserName: "Chrome",
  browser_version: "latest - 2",
};
//Edge
const windows10Edge = {
  ...basicCapabilities,
  os: "Windows",
  os_version: "10",
  browserName: "Edge",
  browser_version: "latest - 2",
};
const windows8_1Edge = {
  ...basicCapabilities,
  os: "Windows",
  os_version: "8.1",
  browserName: "Edge",
  browser_version: "latest - 2",
};

const capabilities = () => ({
  oSCatalinaSafari_13,
  oSBigSurSafari_14,
  windows10Firefox,
  windows7Firefox,
  osCatalinaFirefox,
  windows10Chrome,
  windows7Chrome,
  osCatalinaChrome,
  windows10Edge,
  windows8_1Edge,
});

module.exports.capabilities = capabilities();
