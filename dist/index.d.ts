import { EExportQuality, EExportDataType, SaveImage } from "./saveImage";
export declare const PNG: (maxWidth: number, quality: EExportQuality, exportDataAs: EExportDataType) => SaveImage;
export declare const JPG: (maxWidth: number, quality: EExportQuality, exportDataAs: EExportDataType) => SaveImage;
export declare const WEBP: (maxWidth: number, quality: EExportQuality, exportDataAs: EExportDataType) => SaveImage;
export declare const SaveImageAs: typeof SaveImage;
