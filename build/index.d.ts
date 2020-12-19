declare enum EExportFormat {
    JPG = "image/jpeg",
    PNG = "image/png",
    GIF = "image/gif",
    WEBP = "image/webp",
    TIFF = "image/tiff"
}
export declare type EExportQuality = number;
export declare class SaveImageAs {
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
export {};
