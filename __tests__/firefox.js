const {
  capabilities,
  getDriver,
  testCases,
  testServerURL,
  fileFormats,
} = require("../__mocks__/test-lib");

/*
windows10Firefox,
  windows7Firefox,
  osCatalinaFireFox,
*/
describe("Firefox on OSX/Windows  ", () => {
  const driverCatalina = getDriver("Firefox", capabilities.osCatalinaFirefox);
  const driverWindows10 = getDriver("Firefox", capabilities.windows10Firefox);
  const driverWindows7 = getDriver("Firefox", capabilities.windows7Firefox);
  afterAll(async done => {
    await driverCatalina.quit();
    await driverWindows10.quit();
    await driverWindows7.quit();
    done();
  });

  it("Firefox Latest - 2 On OS X Catalina : Should convert [Png,Jpeg] => [Png,Jpg]  without errors", () => {
    return driverCatalina.get(testServerURL).then(() => {
      const { JPEG, PNG } = fileFormats;
      const cases = [
        [JPEG, PNG],
        [JPEG, PNG],
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

  it("Firefox Latest - 2 On Windows 10 : Should convert [Png,Jpeg] => [Png,Jpg]  without errors", () => {
    return driverWindows10.get(testServerURL).then(() => {
      const { JPEG, PNG } = fileFormats;
      const cases = [
        [JPEG, PNG],
        [JPEG, PNG],
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
  it("Firefox Latest - 2 On Windows 7 : Should convert [Png,Jpeg] => [Png,Jpg]  without errors", () => {
    return driverWindows7.get(testServerURL).then(() => {
      const { JPEG, PNG } = fileFormats;
      const cases = [
        [JPEG, PNG],
        [JPEG, PNG],
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
