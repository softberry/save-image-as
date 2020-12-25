import "core-js/shim";
import "regenerator-runtime/runtime";

const {
  capabilities,
  getFileInfo,
  getTestCases,
  getDriverFor,
} = require("../__mocks__/drivers");

describe("OS X Catalina Safari [13.1]", () => {
  const driverCapabilities = capabilities.oSCatalinaSafari_13;
  const scopedDrivers = {
    Png: getDriverFor("PNG", driverCapabilities),
    Jpeg: getDriverFor("JPEG", driverCapabilities),
    // Webp: getDriverFor("WEBP", driverCapabilities), WEBP is not supported on this Browser
  };
  const testsCases = getTestCases(scopedDrivers);
  afterAll(async () => {
    await testsCases.drivers.Png.quit();
    await testsCases.drivers.Jpeg.quit();
  });

  testsCases.list.forEach(testeCase => {
    testeCase.forEach(item => {
      it(`Convert ${item.inputFileId} -> ${item.resultImgId}`, async () => {
        expect.assertions(2);
        const result = await getFileInfo(
          item.driver,
          item.mockFile,
          item.inputFileId,
          item.resultImgId
        );

        expect(result.data.startsWith(item.data));
        expect(result.width).toEqual(200);
        expect(result.height).toEqual(150);
      });
    });
  });
});
