import { EExportFormat, EExportQuality, SaveImage } from "./saveImage";
export const PNG = (maxWidth: number, quality: EExportQuality): SaveImage => {
  return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.PNG, exportQuality: quality });
};
export const JPEG = (maxWidth: number, quality: EExportQuality): SaveImage => {
  return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.JPG, exportQuality: quality });
};
export const WEBP = (maxWidth: number, quality: EExportQuality): SaveImage => {
  return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.WEBP, exportQuality: quality });
};
export const GIF = (maxWidth: number, quality: EExportQuality): SaveImage => {
  return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.GIF, exportQuality: quality });
};
export const TIFF = (maxWidth: number, quality: EExportQuality): SaveImage => {
  return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.TIFF, exportQuality: quality });
};
export const SVG = (maxWidth: number, quality: EExportQuality): SaveImage => {
  return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.SVG, exportQuality: quality });
};

export const SaveImageAs = SaveImage;
