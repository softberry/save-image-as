/**
 * Available image formats
 */
export enum EExportFormat {
  JPG = "image/jpeg",
  PNG = "image/png",
  WEBP = "image/webp",
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
export enum EExportDataType {
  /**
   * readAsArrayBuffer
   */
  ARRAY_BUFFER,
  /**
   * readAsBinaryString
   */
  BINARY_STRING,
  /**
   * readAsDataURL
   */
  DATA_URL,
}
export interface ISaveImageOptions {
  maxImageWidth: number;
  exportFormat: EExportFormat;
  exportQuality: number;
  exportDataType: EExportDataType;
}

export type TConvertedResult = string | ArrayBuffer | null;

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
  /**
   *
   */
  exportDataType: EExportDataType;

  constructor({
    maxImageWidth = 200,
    exportFormat = EExportFormat.PNG,
    exportQuality = 0.7,
    exportDataType = EExportDataType.DATA_URL,
  }: ISaveImageOptions) {
    if (maxImageWidth < 0 || isNaN(maxImageWidth)) {
      throw new Error("`maxImageWidth` should be positive number");
    }
    if (!Object.values(EExportFormat).includes(exportFormat)) {
      throw new Error(
        `"exportFormat" must be one of: ${Object.values(
          EExportFormat
        ).toString()}`
      );
    }
    if (isNaN(exportQuality) || exportQuality < 0 || exportQuality > 1) {
      throw new Error("`exportQuality` must be between 0 and 1");
    }

    this.maxImageWidth = maxImageWidth;
    this.exportFormat = exportFormat;
    this.exportQuality = exportQuality;
    this.exportDataType = exportDataType;
  }
  private cleanUp(img: HTMLImageElement): void {
    document.body.removeChild(img);
  }

  private imageLoaded(
    img: HTMLImageElement
  ): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const scaleRatio =
        this.maxImageWidth < img.width ? img.width / this.maxImageWidth : 1;
      canvas.width = img.width / scaleRatio;
      canvas.height = img.height / scaleRatio;

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

      const reader = new FileReader();

      reader.onloadend = (): void => {
        const { result } = reader;
        this.cleanUp(img);
        resolve(result);
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
            switch (this.exportDataType) {
              case EExportDataType.ARRAY_BUFFER:
                reader.readAsArrayBuffer(blob);
                break;
              case EExportDataType.BINARY_STRING:
                reader.readAsBinaryString(blob);
                break;
              case EExportDataType.DATA_URL:
                reader.readAsDataURL(blob);
                break;
              default:
                reader.readAsDataURL(blob);
                break;
            }
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
  private imageData(
    data: string | ArrayBuffer
  ): Promise<string | ArrayBuffer | null> {
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
      img.src = data.toString();
    });
  }
  public convert(file: File | null): Promise<TConvertedResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (readerEvent: ProgressEvent<FileReader>): void => {
        const data = readerEvent.target?.result;

        if (data) {
          resolve(this.imageData(data));
        } else {
          reject(ERejectReason.FILE_HAS_NO_READIBLE_DATA);
        }
      };
      if (file === null) resolve(null);
      else reader.readAsDataURL(file);
    });
  }
  public onChange(e: Event): Promise<TConvertedResult | TConvertedResult[]> {
    const el = e.target as HTMLInputElement;
    if (!el || el.files === null) return Promise.resolve("");

    if (el.files.length === 1) {
      return this.convert(el.files.item(0));
    }
    const fileListArray = new Array(el.files.length)
      .fill(null)
      .map((_, index) => {
        console.log(index);
        return this.convert(el?.files?.item(index) || null);
      });

    return Promise.all(fileListArray);

    return Promise.resolve("");
  }
}
