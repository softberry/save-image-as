import { EExportFormat, SaveImage, } from "./saveImage";
export const PNG = (maxWidth, quality, exportDataAs) => {
    return new SaveImage({
        maxImageWidth: maxWidth,
        exportFormat: EExportFormat.PNG,
        exportQuality: quality,
        exportDataType: exportDataAs,
    });
};
export const JPG = (maxWidth, quality, exportDataAs) => {
    return new SaveImage({
        maxImageWidth: maxWidth,
        exportFormat: EExportFormat.JPG,
        exportQuality: quality,
        exportDataType: exportDataAs,
    });
};
export const WEBP = (maxWidth, quality, exportDataAs) => {
    return new SaveImage({
        maxImageWidth: maxWidth,
        exportFormat: EExportFormat.WEBP,
        exportQuality: quality,
        exportDataType: exportDataAs,
    });
};
export const SaveImageAs = SaveImage;
//# sourceMappingURL=index.js.map