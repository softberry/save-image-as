export var EExportFormat;
(function (EExportFormat) {
    EExportFormat["JPG"] = "image/jpeg";
    EExportFormat["PNG"] = "image/png";
    EExportFormat["GIF"] = "image/gif";
    EExportFormat["WEBP"] = "image/webp";
    EExportFormat["TIFF"] = "image/tiff";
})(EExportFormat || (EExportFormat = {}));
export var ERejectReason;
(function (ERejectReason) {
    ERejectReason["COULD_NOT_READ"] = "COULD_NOT_READ";
    ERejectReason["ABORTED"] = "ABORTED";
    ERejectReason["EMPTY_TRANSFER"] = "EMPTY_TRANSFER";
    ERejectReason["IMAGE_COULD_NOT_LOADED"] = "IMAGE_COULD_NOT_LOADED";
    ERejectReason["FILE_HAS_NO_READIBLE_DATA"] = "FILE_HAS_NO_READIBLE_DATA";
    ERejectReason["NO_IMAGE_FILE_SELECTED"] = "NO_IMAGE_FILE_SELECTED";
})(ERejectReason || (ERejectReason = {}));
class SaveImage {
    constructor({ maxImageWidth = 200, exportFormat = EExportFormat.PNG, exportQuality = 0.7 }) {
        this.maxImageWidth = maxImageWidth;
        this.exportFormat = exportFormat;
        this.exportQuality = exportQuality;
    }
    cleanUp(img) {
        document.body.removeChild(img);
    }
    imageLoaded(img) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const scaleRatio = this.maxImageWidth < img.width ? img.width / this.maxImageWidth : 1;
            canvas.width = img.width / scaleRatio;
            canvas.height = img.height / scaleRatio;
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const reader = new FileReader();
            reader.onloadend = () => {
                const { result } = reader;
                this.cleanUp(img);
                resolve((result === null || result === void 0 ? void 0 : result.toString()) || "");
            };
            reader.onerror = () => {
                this.cleanUp(img);
                reject(ERejectReason.COULD_NOT_READ);
            };
            reader.onabort = () => {
                this.cleanUp(img);
                reject(ERejectReason.ABORTED);
            };
            canvas.toBlob(blob => {
                if (blob !== null) {
                    reader.readAsDataURL(blob);
                }
                else {
                    this.cleanUp(img);
                    reject(ERejectReason.EMPTY_TRANSFER);
                }
            }, this.exportFormat, this.exportQuality);
        });
    }
    imageData(data) {
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
    onChange(e) {
        const el = e.target;
        return new Promise((resolve, reject) => {
            if ((el === null || el === void 0 ? void 0 : el.files) && el.files.length > 0) {
                const reader = new FileReader();
                reader.onload = (readerEvent) => {
                    var _a;
                    const data = (_a = readerEvent.target) === null || _a === void 0 ? void 0 : _a.result;
                    if (data) {
                        resolve(this.imageData(data.toString()));
                    }
                    else {
                        reject(ERejectReason.FILE_HAS_NO_READIBLE_DATA);
                    }
                };
                reader.readAsDataURL(el.files[0]);
            }
            else {
                reject(ERejectReason.NO_IMAGE_FILE_SELECTED);
            }
        });
    }
}
export const PNG = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.PNG, exportQuality: quality });
};
export const JPEG = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.JPG, exportQuality: quality });
};
export const WEBP = (maxWidth, quality) => {
    return new SaveImage({ maxImageWidth: maxWidth, exportFormat: EExportFormat.WEBP, exportQuality: quality });
};
//# sourceMappingURL=index.js.map