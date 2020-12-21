/**
 * Available image formats
 */
export enum EExportFormat {
  JPG = "image/jpeg",
  PNG = "image/png",
  GIF = "image/gif",
  WEBP = "image/webp",
  TIFF = "image/tiff",
  SVG = "image/svg+xml",
}
/**
 * Quality of resulting image  between 0 and 1
 */
export type EExportQuality = number;

export enum ERejectReason {
  COULD_NOT_READ = "COULD_NOT_READ",
  ABORTED = "ABORTED",
  EMPTY_TRANSFER = "EMPTY_TRANSFER",
  IMAGE_COULD_NOT_LOADED = "IMAGE_COULD_NOT_LOADED",
  FILE_HAS_NO_READIBLE_DATA = "FILE_HAS_NO_READIBLE_DATA",
  NO_IMAGE_FILE_SELECTED = "NO_IMAGE_FILE_SELECTED",
}
export interface ISaveImageOptions {
  maxImageWidth: number;
  exportFormat: EExportFormat;
  exportQuality: number;
}
export class SaveImage {
  /**
   * Allow maximal width for the exported image. Height will be calculated using original aspect ratio to avoid distortion
   */
  maxImageWidth: number;
  /** 
      Exported file format 
     */
  exportFormat: EExportFormat;
  /**
   * Quality of exported image accepts value between 0-1.
   */
  exportQuality: EExportQuality;

  constructor({ maxImageWidth = 200, exportFormat = EExportFormat.PNG, exportQuality = 0.7 }: ISaveImageOptions) {
    if (maxImageWidth < 0 || isNaN(maxImageWidth)) {
      throw new Error("`maxImageWidth` should be positive number");
    }
    if (!Object.values(EExportFormat).includes(exportFormat)) {
      throw new Error(`"exportFormat" must be one of: ${Object.values(EExportFormat).toString()}`);
    }
    if (isNaN(exportQuality) || exportQuality < 0 || exportQuality > 1) {
      throw new Error("`exportQuality` must be between 0 and 1");
    }

    this.maxImageWidth = maxImageWidth;
    this.exportFormat = exportFormat;
    this.exportQuality = exportQuality;
  }
  private cleanUp(img: HTMLImageElement): void {
    document.body.removeChild(img);
  }

  private imageLoaded(img: HTMLImageElement): Promise<string> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const scaleRatio = this.maxImageWidth < img.width ? img.width / this.maxImageWidth : 1;
      canvas.width = img.width / scaleRatio;
      canvas.height = img.height / scaleRatio;

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      const reader = new FileReader();

      reader.onloadend = (): void => {
        const { result } = reader;
        this.cleanUp(img);
        resolve(result?.toString() || "");
      };
      reader.onerror = (): void => {
        this.cleanUp(img);
        reject(ERejectReason.COULD_NOT_READ);
      };
      reader.onabort = (): void => {
        this.cleanUp(img);
        reject(ERejectReason.ABORTED);
      };

      canvas.toBlob(
        blob => {
          if (blob !== null) {
            reader.readAsDataURL(blob);
          } else {
            this.cleanUp(img);
            reject(ERejectReason.EMPTY_TRANSFER);
          }
        },
        this.exportFormat,
        this.exportQuality
      );
    });
  }
  private imageData(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      document.body.appendChild(img);
      img.style.position = "fixed";
      img.style.opacity = "0";
      img.style.left = this.maxImageWidth * -100 + "px";
      img.addEventListener("load", () => {
        resolve(this.imageLoaded(img));
      });
      img.addEventListener("error", () => {
        reject(ERejectReason.IMAGE_COULD_NOT_LOADED);
        this.cleanUp(img);
      });
      img.src = data;
    });
  }

  public onChange(e: Event): Promise<string> {
    const el = e.target as HTMLInputElement;
    return new Promise((resolve, reject) => {
      if (el?.files && el.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (readerEvent: ProgressEvent<FileReader>): void => {
          const data = readerEvent.target?.result;

          if (data) {
            resolve(this.imageData(data.toString()));
          } else {
            reject(ERejectReason.FILE_HAS_NO_READIBLE_DATA);
          }
        };
        reader.readAsDataURL(el.files[0]);
      } else {
        reject(ERejectReason.NO_IMAGE_FILE_SELECTED);
      }
    });
  }
}