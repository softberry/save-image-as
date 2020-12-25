import "core-js/shim";
import "regenerator-runtime/runtime";

const {
  capabilities,
  getFileInfo,
  getTestCases,
  getDriverFor,
} = require("../__mocks__/drivers");

describe("Windows 7 IE 11", () => {
  const driverCapabilities = capabilities.windows7IE11;
  const scopedDrivers = {
    Png: getDriverFor("PNG", driverCapabilities),
    Jpeg: getDriverFor("JPEG", driverCapabilities),
    // Webp: getDriverFor("WEBP", driverCapabilities), // not supported on IE11
  };
  const testsCases = getTestCases(scopedDrivers);

  afterAll(async () => {
    await testsCases.drivers.Png.quit();
    await testsCases.drivers.Jpeg.quit();
    // await testsCases.drivers.Webp.quit();
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
