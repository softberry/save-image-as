import "core-js/shim";
import "regenerator-runtime/runtime";

const { drivers, getFileInfo, getDriverFor } = require("../__mocks__/drivers");

describe("Test PNG to JPG Convertion", () => {
  it("should ", async () => {
    const driver = getDriverFor(drivers.windows10FirefoxLatest);
    expect.assertions(2);
    const result = await getFileInfo(driver, "../__mocks__/color-palette.png");
    await driver.quit();
    expect(result.data.startsWith("data:image/jpeg;base64"));
    expect(result.width).toEqual(200);
    expect(result.height).toEqual(150);
  });
});
