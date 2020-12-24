import "core-js/shim";
import "regenerator-runtime/runtime";

const { drivers, getFileInfo, getDriverFor } = require("../__mocks__/drivers");

describe("Should convert without error", () => {
  const tests = ["Png", "Jpeg", "Webp"].map((src, i, array) => {
    return array.map(target => {
      return {
        mockFile: `../__mocks__/color-palette.${src.toLowerCase()}`,
        inputFileId: `imageFile${src}To${target}`,
        resultImgId: `result${src}To${target}`,
        data: `data:image/${src.toLowerCase()};base64`,
      };
    });
  });
  tests.forEach(test => {
    test.forEach(item => {
      it(`Convert ${item.inputFileId} -> ${item.resultImgId}`, async () => {
        const driver = getDriverFor(drivers.windows10FirefoxLatest);
        expect.assertions(2);
        const result = await getFileInfo(
          driver,
          item.mockFile,
          item.inputFileId,
          item.resultImgId
        );
        await driver.quit();
        expect(result.data.startsWith(item.data));
        expect(result.width).toEqual(200);
        expect(result.height).toEqual(150);
      });
    });
  });
});
