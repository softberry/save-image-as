(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./saveImage"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SaveImageAs = exports.WEBP = exports.JPG = exports.PNG = void 0;
    const saveImage_1 = require("./saveImage");
    const PNG = (maxWidth, quality, exportDataAs) => {
        return new saveImage_1.SaveImage({
            maxImageWidth: maxWidth,
            exportFormat: saveImage_1.EExportFormat.PNG,
            exportQuality: quality,
            exportDataType: exportDataAs,
        });
    };
    exports.PNG = PNG;
    const JPG = (maxWidth, quality, exportDataAs) => {
        return new saveImage_1.SaveImage({
            maxImageWidth: maxWidth,
            exportFormat: saveImage_1.EExportFormat.JPG,
            exportQuality: quality,
            exportDataType: exportDataAs,
        });
    };
    exports.JPG = JPG;
    const WEBP = (maxWidth, quality, exportDataAs) => {
        return new saveImage_1.SaveImage({
            maxImageWidth: maxWidth,
            exportFormat: saveImage_1.EExportFormat.WEBP,
            exportQuality: quality,
            exportDataType: exportDataAs,
        });
    };
    exports.WEBP = WEBP;
    exports.SaveImageAs = saveImage_1.SaveImage;
});
//# sourceMappingURL=index.js.map