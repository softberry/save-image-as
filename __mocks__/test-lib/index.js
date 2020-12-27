import "core-js/shim";
import "regenerator-runtime/runtime";

const { capabilities } = require("./capabilities");
const { getDriver } = require("./getDriver");

const { testCases, getFileInfo, testServerURL } = require("./testCases");
const { fileFormats } = require("./interfaces");

module.exports = {
  capabilities,
  getDriver,
  getFileInfo,
  testCases,
  testServerURL,
  fileFormats,
};
