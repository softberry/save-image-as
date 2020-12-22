import { EExportFormat, EExportQuality, SaveImage } from "./saveImage";
export const PNG = (maxWidth: number, quality: EExportQuality): SaveImage => {
  return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.PNG, exportQuality: quality });
};
export const JPG = (maxWidth: number, quality: EExportQuality): SaveImage => {
  return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.JPG, exportQuality: quality });
};
export const WEBP = (maxWidth: number, quality: EExportQuality): SaveImage => {
  return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.WEBP, exportQuality: quality });
};

export const SaveImageAs = SaveImage;
