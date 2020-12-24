export declare enum EExportFormat {
    JPG = "image/jpeg",
    PNG = "image/png",
    WEBP = "image/webp"
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
export interface ISaveImageOptions {
    maxImageWidth: number;
    exportFormat: EExportFormat;
    exportQuality: number;
}
export declare class SaveImage {
    maxImageWidth: number;
    exportFormat: EExportFormat;
    exportQuality: EExportQuality;
    constructor({ maxImageWidth, exportFormat, exportQuality, }: ISaveImageOptions);
    private cleanUp;
    private imageLoaded;
    private imageData;
    onChange(e: Event): Promise<string>;
}
