const {
  capabilities,
  getDriver,
  testCases,
  testServerURL,
  fileFormats,
} = require("../__mocks__/test-lib");

describe("Chrome on OSX/Windows  ", () => {
  const driverWindows10 = getDriver("Chrome", capabilities.windows10Edge);
  const driverWindows81 = getDriver("Chrome", capabilities.windows8_1Edge);
  afterAll(async done => {
    await driverWindows10.quit();
    await driverWindows81.quit();
    done();
  });

  it("Chrome Latest - 2 On Windows 10 : Should convert [Png,Jpeg,Webp] => [Png,Jpg,Webp]  without errors", () => {
    return driverWindows10.get(testServerURL).then(() => {
      const { JPEG, PNG, WEBP } = fileFormats;
      const cases = [
        [JPEG, PNG, WEBP],
        [JPEG, PNG, WEBP],
      ];
      return testCases(driverWindows10, ...cases).then(results => {
        return cases.flat().forEach((format, index) => {
          const image = results[index];
          expect(
            image.data.startsWith(`data:image/${format.toLowerCase()};base64`)
          ).toBe(true);
          expect(image.width).toEqual(200);
          expect(image.height).toEqual(150);
        });
      });
    });
  });
  it("Chrome Latest - 2 On Windows 8.1 : Should convert [Png,Jpeg,Webp] => [Png,Jpg,Webp]  without errors", () => {
    return driverWindows81.get(testServerURL).then(() => {
      const { JPEG, PNG, WEBP } = fileFormats;
      const cases = [
        [JPEG, PNG, WEBP],
        [JPEG, PNG, WEBP],
      ];
      return testCases(driverWindows81, ...cases).then(results => {
        return cases.flat().forEach((format, index) => {
          const image = results[index];
          expect(
            image.data.startsWith(`data:image/${format.toLowerCase()};base64`)
          ).toBe(true);
          expect(image.width).toEqual(200);
          expect(image.height).toEqual(150);
        });
      });
    });
  });
});
