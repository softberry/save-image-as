import { EExportQuality, SaveImage } from "./saveImage";
export declare const PNG: (maxWidth: number, quality: EExportQuality) => SaveImage;
export declare const JPG: (maxWidth: number, quality: EExportQuality) => SaveImage;
export declare const WEBP: (maxWidth: number, quality: EExportQuality) => SaveImage;
export declare const SaveImageAs: typeof SaveImage;
