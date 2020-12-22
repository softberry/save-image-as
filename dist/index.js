import { EExportFormat, SaveImage } from "./saveImage";
export const PNG = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.PNG, exportQuality: quality });
};
export const JPG = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.JPG, exportQuality: quality });
};
export const WEBP = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.WEBP, exportQuality: quality });
};
export const SaveImageAs = SaveImage;
//# sourceMappingURL=index.js.map