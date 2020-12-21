import { EExportFormat, SaveImage } from "./saveImage";
export const PNG = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.PNG, exportQuality: quality });
};
export const JPEG = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.JPG, exportQuality: quality });
};
export const WEBP = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.WEBP, exportQuality: quality });
};
export const GIF = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.GIF, exportQuality: quality });
};
export const TIFF = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.TIFF, exportQuality: quality });
};
export const SVG = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.SVG, exportQuality: quality });
};
//# sourceMappingURL=index.js.map