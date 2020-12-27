const { resolve } = require("path");
const testServerURL = "https://softberry.github.io/save-image-as/";

const getFileInfo = (driver, mockFile, inputFileId, resultImgId) => {
  return driver
    .findElement({ id: inputFileId })
    .sendKeys(mockFile)
    .then(async () => {
      const data = await driver
        .findElement({ id: resultImgId })
        .getAttribute("src");
      const rect = await driver.findElement({ id: resultImgId }).getRect();
      return { data, ...rect };
    })
    .catch(err => {
      console.table(err);
    });
};

/**
 *
 * @param {[string]} sourceFormats
 * @param {[string]} targetFormats
 */
const testCases = (driver, sourceFormats, targetFormats) => {
  const allCases = sourceFormats.map(src =>
    targetFormats.map(async target => {
      const mockFile = resolve(
        __dirname,
        `../color-palette.${src.toLowerCase()}`
      );
      const inputFileId = `imageFile${src}To${target}`;
      const resultImgId = `result${src}To${target}`;
      return getFileInfo(driver, mockFile, inputFileId, resultImgId);
    })
  );
  return Promise.all(allCases.flat());
};

module.exports = {
  getFileInfo,
  testCases,
  testServerURL,
};
