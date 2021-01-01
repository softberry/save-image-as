window.saveImageAs=function(){"use strict";var e={514:function(e,t,r){var n,o,a;r.r(t),r.d(t,{JPG:function(){return d},PNG:function(){return u},SaveImageAs:function(){return p},WEBP:function(){return c}}),function(e){e.JPG="image/jpeg",e.PNG="image/png",e.WEBP="image/webp"}(n||(n={})),function(e){e.COULD_NOT_READ="COULD_NOT_READ",e.ABORTED="ABORTED",e.EMPTY_TRANSFER="EMPTY_TRANSFER",e.IMAGE_COULD_NOT_LOADED="IMAGE_COULD_NOT_LOADED",e.FILE_HAS_NO_READIBLE_DATA="FILE_HAS_NO_READIBLE_DATA",e.NO_IMAGE_FILE_SELECTED="NO_IMAGE_FILE_SELECTED"}(o||(o={})),function(e){e[e.ARRAY_BUFFER=0]="ARRAY_BUFFER",e[e.BINARY_STRING=1]="BINARY_STRING",e[e.DATA_URL=2]="DATA_URL"}(a||(a={}));var i=function(){function e(e){var t=e.maxImageWidth,r=void 0===t?200:t,o=e.exportFormat,i=void 0===o?n.PNG:o,u=e.exportQuality,d=void 0===u?.7:u,c=e.exportDataType,p=void 0===c?a.DATA_URL:c;if(r<0||isNaN(r))throw new Error("`maxImageWidth` should be positive number");if(!Object.values(n).includes(i))throw new Error('"exportFormat" must be one of: '+Object.values(n).toString());if(isNaN(d)||d<0||d>1)throw new Error("`exportQuality` must be between 0 and 1");this.maxImageWidth=r,this.exportFormat=i,this.exportQuality=d,this.exportDataType=p}return e.prototype.cleanUp=function(e){document.body.removeChild(e)},e.prototype.imageLoaded=function(e){var t=this;return new Promise((function(r,n){var i=document.createElement("canvas"),u=i.getContext("2d"),d=t.maxImageWidth<e.width?e.width/t.maxImageWidth:1;i.width=e.width/d,i.height=e.height/d,null==u||u.drawImage(e,0,0,i.width,i.height);var c=new FileReader;c.onloadend=function(){var n=c.result;t.cleanUp(e),r(n)},c.onerror=function(){t.cleanUp(e),n(o.COULD_NOT_READ)},c.onabort=function(){t.cleanUp(e),n(o.ABORTED)},i.toBlob((function(r){if(null!==r)switch(t.exportDataType){case a.ARRAY_BUFFER:c.readAsArrayBuffer(r);break;case a.BINARY_STRING:c.readAsBinaryString(r);break;case a.DATA_URL:default:c.readAsDataURL(r)}else t.cleanUp(e),n(o.EMPTY_TRANSFER)}),t.exportFormat,t.exportQuality)}))},e.prototype.imageData=function(e){var t=this;return new Promise((function(r,n){var a=document.createElement("img");document.body.appendChild(a),a.style.position="fixed",a.style.opacity="0",a.style.left=-100*t.maxImageWidth+"px",a.addEventListener("load",(function(){r(t.imageLoaded(a))})),a.addEventListener("error",(function(){n(o.IMAGE_COULD_NOT_LOADED),t.cleanUp(a)})),a.src=e.toString()}))},e.prototype.onChange=function(e){var t=this,r=e.target;return new Promise((function(e,n){if((null==r?void 0:r.files)&&r.files.length>0){var a=new FileReader;a.onload=function(r){var a,i=null===(a=r.target)||void 0===a?void 0:a.result;i?e(t.imageData(i)):n(o.FILE_HAS_NO_READIBLE_DATA)},a.readAsDataURL(r.files[0])}else n(o.NO_IMAGE_FILE_SELECTED)}))},e}(),u=function(e,t,r){return new i({maxImageWidth:e,exportFormat:n.PNG,exportQuality:t,exportDataType:r})},d=function(e,t,r){return new i({maxImageWidth:e,exportFormat:n.JPG,exportQuality:t,exportDataType:r})},c=function(e,t,r){return new i({maxImageWidth:e,exportFormat:n.WEBP,exportQuality:t,exportDataType:r})},p=i}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}return r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(514)}();
//# sourceMappingURL=save-image-as.js.map