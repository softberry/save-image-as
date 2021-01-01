import { EExportFormat, SaveImage, } from "./saveImage";
export const PNG = (maxWidth, quality, exportData) => {
    return new SaveImage({
        maxImageWidth: maxWidth,
        exportFormat: EExportFormat.PNG,
        exportQuality: quality,
        exportDataType: exportData,
    });
};
export const JPG = (maxWidth, quality, exportData) => {
    return new SaveImage({
        maxImageWidth: maxWidth,
        exportFormat: EExportFormat.JPG,
        exportQuality: quality,
        exportDataType: exportData,
    });
};
export const WEBP = (maxWidth, quality, exportData) => {
    return new SaveImage({
        maxImageWidth: maxWidth,
        exportFormat: EExportFormat.WEBP,
        exportQuality: quality,
        exportDataType: exportData,
    });
};
export const SaveImageAs = SaveImage;
//# sourceMappingURL=index.js.map