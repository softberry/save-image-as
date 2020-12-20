export declare enum EExportFormat {
    JPG = "image/jpeg",
    PNG = "image/png",
    GIF = "image/gif",
    WEBP = "image/webp",
    TIFF = "image/tiff"
}
export declare type EExportQuality = number;
export declare enum ERejectReason {
    COULD_NOT_READ = "COULD_NOT_READ",
    ABORTED = "ABORTED",
    EMPTY_TRANSFER = "EMPTY_TRANSFER",
    IMAGE_COULD_NOT_LOADED = "IMAGE_COULD_NOT_LOADED",
    FILE_HAS_NO_READIBLE_DATA = "FILE_HAS_NO_READIBLE_DATA",
    NO_IMAGE_FILE_SELECTED = "NO_IMAGE_FILE_SELECTED"
}
declare class SaveImage {
    maxImageWidth: number;
    exportFormat: EExportFormat;
    exportQuality: EExportQuality;
    constructor({ maxImageWidth, exportFormat, exportQuality }: {
        maxImageWidth?: number | undefined;
        exportFormat?: EExportFormat | undefined;
        exportQuality?: number | undefined;
    });
    private cleanUp;
    private imageLoaded;
    private imageData;
    onChange(e: Event): Promise<string>;
}
export declare const PNG: (maxWidth: number, quality: EExportQuality) => SaveImage;
export declare const JPEG: (maxWidth: number, quality: EExportQuality) => SaveImage;
export declare const WEBP: (maxWidth: number, quality: EExportQuality) => SaveImage;
export {};
