import {
  EExportFormat,
  EExportQuality,
  EExportDataType,
  SaveImage,
} from "./saveImage";
export const PNG = (
  maxWidth: number,
  quality: EExportQuality,
  exportData: EExportDataType
): SaveImage => {
  return new SaveImage({
    maxImageWidth: maxWidth,
    exportFormat: EExportFormat.PNG,
    exportQuality: quality,
    exportDataType: exportData,
  });
};
export const JPG = (
  maxWidth: number,
  quality: EExportQuality,
  exportData: EExportDataType
): SaveImage => {
  return new SaveImage({
    maxImageWidth: maxWidth,
    exportFormat: EExportFormat.JPG,
    exportQuality: quality,
    exportDataType: exportData,
  });
};
export const WEBP = (
  maxWidth: number,
  quality: EExportQuality,
  exportData: EExportDataType
): SaveImage => {
  return new SaveImage({
    maxImageWidth: maxWidth,
    exportFormat: EExportFormat.WEBP,
    exportQuality: quality,
    exportDataType: exportData,
  });
};

export const SaveImageAs = SaveImage;
