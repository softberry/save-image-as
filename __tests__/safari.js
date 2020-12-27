const {
  capabilities,
  getDriver,
  testCases,
  testServerURL,
  fileFormats,
} = require("../__mocks__/test-lib");

describe("Safari on OSX  ", () => {
  const driverCatalina = getDriver("safari ", capabilities.oSCatalinaSafari_13);
  const driverBigSur = getDriver("safari ", capabilities.oSBigSurSafari_14);
  afterAll(async done => {
    await driverCatalina.quit();
    await driverBigSur.quit();
    done();
  });
  // This version of safari do not support WEBP, so it's excluded from tests
  it("Safari v13 On OS X Catalina : Should convert [Png,Jpeg] => [Png,Jpg]  without errors", () => {
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
  // Unfortunately safari on BigSur also do not support WEBP, so it's excluded from tests
  it("Safari 14 on OSX BigSUr : Should convert [Png,Jpeg,Webp] => [Png,Jpg,Webp]  without errors", () => {
    return driverBigSur.get(testServerURL).then(() => {
      const { JPEG, PNG } = fileFormats;
      const cases = [
        [JPEG, PNG],
        [JPEG, PNG],
      ];
      return testCases(driverBigSur, ...cases).then(results => {
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
