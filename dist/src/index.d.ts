interface ImageDataProps {
    maxImageWidth: number;
}
export declare class ImageData {
    maxImageWidth: number;
    constructor({ maxImageWidth }: ImageDataProps);
    private imageLoaded;
    private imageData;
    onChange(e: Event): Promise<string>;
}
export {};
