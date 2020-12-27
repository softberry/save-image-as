const {
  capabilities,
  getDriver,
  testCases,
  testServerURL,
  fileFormats,
} = require("../__mocks__/test-lib");

describe("Chrome on OSX/Windows  ", () => {
  const driverCatalina = getDriver("Chrome", capabilities.osCatalinaChrome);
  const driverWindows10 = getDriver("Chrome", capabilities.windows10Chrome);
  const driverWindows7 = getDriver("Chrome", capabilities.windows7Chrome);
  afterAll(async done => {
    await driverCatalina.quit();
    await driverWindows10.quit();
    await driverWindows7.quit();
    done();
  });

  it("Chrome Latest - 2 On OS X Catalina : Should convert [Png,Jpeg,Webp] => [Png,Jpg,Webp]  without errors", () => {
    return driverCatalina.get(testServerURL).then(() => {
      const { JPEG, PNG, WEBP } = fileFormats;
      const cases = [
        [JPEG, PNG, WEBP],
        [JPEG, PNG, WEBP],
      ];
      return testCases(driverCatalina, ...cases).then(results => {
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
  it("Chrome Latest - 2 On Windows 7 : Should convert [Png,Jpeg,Webp] => [Png,Jpg,Webp]  without errors", () => {
    return driverWindows7.get(testServerURL).then(() => {
      const { JPEG, PNG, WEBP } = fileFormats;
      const cases = [
        [JPEG, PNG, WEBP],
        [JPEG, PNG, WEBP],
      ];
      return testCases(driverWindows7, ...cases).then(results => {
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
