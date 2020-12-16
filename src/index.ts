interface ImageDataProps {
  /**
   * Allow maximal width for the exported image. Height will be calculated using original aspect ratio to avoid distortion
   */
  maxImageWidth: number;
  /** Exported file format */
  exportFormat?: EExportFormat;
}

enum EExportFormat {
  JPG = "JPG",
  PNG = "PNG",
}

enum ERejectReason {
  COULD_NOT_READ = "COULD_NOT_READ",
  ABORTED = "ABORTED",
  EMPTY_TRANSFER = "EMPTY_TRANSFER",
  IMAGE_COULD_NOT_LOADED = "IMAGE_COULD_NOT_LOADED",
  FILE_HAS_NO_READIBLE_DATA = "FILE_HAS_NO_READIBLE_DATA",
  NO_IMAGE_FILE_SELECTED = "NO_IMAGE_FILE_SELECTED",
}

export class ImageData {
  maxImageWidth;
  exportFormat;

  constructor({ maxImageWidth = 200, exportFormat = EExportFormat.PNG }: ImageDataProps) {
    this.maxImageWidth = maxImageWidth;
    this.exportFormat = exportFormat;
  }
  private imageLoaded = (img: HTMLImageElement): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      var reader = new FileReader();

      reader.onloadend = () => {
        const { result } = reader;

        resolve(result?.toString() || "");
      };
      reader.onerror = er => {
        reject(ERejectReason.COULD_NOT_READ);
      };
      reader.onabort = () => {
        reject(ERejectReason.ABORTED);
      };

      canvas.toBlob(blob => {
        if (blob !== null) {
          reader.readAsDataURL(blob);
          // reader.readAsDataURL(blob);
        } else {
          reject(ERejectReason.EMPTY_TRANSFER);
        }
      });
    });
  };
  private imageData(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      document.body.appendChild(img);
      img.width = this.maxImageWidth;
      img.style.position = "fixed";
      img.style.opacity = "0";
      img.style.left = this.maxImageWidth * -100 + "px";
      img.addEventListener("load", () => {
        resolve(this.imageLoaded(img));
      });
      img.addEventListener("error", () => {
        reject(ERejectReason.IMAGE_COULD_NOT_LOADED);
      });
      img.src = data;
    });
  }

  onChange(e: Event): Promise<string> {
    const el = e.target as HTMLInputElement;
    return new Promise((resolve, reject) => {
      if (el?.files && el.files.length > 0) {
        const reader = new FileReader();
        reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
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

(() => {
  const file = document.getElementById("imageFile");
  const imageData = new ImageData({ maxImageWidth: 200 });

  file &&
    file.addEventListener("change", e => {
      imageData
        .onChange(e)
        .then(base => {
          console.log(base);
        })
        .catch(err => {
          console.log("error: ", err);
        });
    });
})();
