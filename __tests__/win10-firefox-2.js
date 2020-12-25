import "core-js/shim";
import "regenerator-runtime/runtime";

const { drivers, getFileInfo, getTestCases } = require("../__mocks__/drivers");

describe("Windows 10 Firefox [latest - 2]", () => {
  const driverCapabilities = drivers.windows10FirefoxLatest_2;
  const scopedDrivers = {
    Png: getDriverFor("PNG", driverCapabilities),
    Jpeg: getDriverFor("JPEG", driverCapabilities),
    Webp: getDriverFor("JPEG", driverCapabilities),
  };
  const testsCases = getTestCases(scopedDrivers);

  afterAll(async () => {
    await testsCases.drivers.Png.quit();
    await testsCases.drivers.Jpeg.quit();
    await testsCases.drivers.Webp.quit();
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
