import "core-js/shim";
import "regenerator-runtime/runtime";

const { drivers, getFileInfo, getDriverFor } = require("../__mocks__/drivers");
const testServerURL = "https://softberry.github.io/save-image-as/";

describe("Should convert without error", () => {
  const scopedDrivers = {
    Png: getDriverFor("PNG", drivers.windows10FirefoxLatest),
    Jpeg: getDriverFor("JPEG", drivers.windows10FirefoxLatest),
    Webp: getDriverFor("WEBP", drivers.windows10FirefoxLatest),
  };
  const testsCases = ["Png", "Jpeg", "Webp"].map((src, i, array) => {
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

  afterAll(async () => {
    await scopedDrivers.Png.quit();
    await scopedDrivers.Jpeg.quit();
    await scopedDrivers.Webp.quit();
  });

  testsCases.forEach(testeCase => {
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
