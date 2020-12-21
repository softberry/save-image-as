import { EExportQuality, SaveImage } from "./saveImage";
export declare const PNG: (maxWidth: number, quality: EExportQuality) => SaveImage;
export declare const JPEG: (maxWidth: number, quality: EExportQuality) => SaveImage;
export declare const WEBP: (maxWidth: number, quality: EExportQuality) => SaveImage;
export declare const GIF: (maxWidth: number, quality: EExportQuality) => SaveImage;
export declare const TIFF: (maxWidth: number, quality: EExportQuality) => SaveImage;
export declare const SVG: (maxWidth: number, quality: EExportQuality) => SaveImage;
