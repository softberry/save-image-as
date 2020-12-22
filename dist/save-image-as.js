self.SaveImageAs=(()=>{"use strict";var e={925:(e,t,o)=>{var r,a;o.r(t),o.d(t,{JPG:()=>s,PNG:()=>n,SaveImageAs:()=>d,WEBP:()=>l}),function(e){e.JPG="image/jpeg",e.PNG="image/png",e.WEBP="image/webp"}(r||(r={})),function(e){e.COULD_NOT_READ="COULD_NOT_READ",e.ABORTED="ABORTED",e.EMPTY_TRANSFER="EMPTY_TRANSFER",e.IMAGE_COULD_NOT_LOADED="IMAGE_COULD_NOT_LOADED",e.FILE_HAS_NO_READIBLE_DATA="FILE_HAS_NO_READIBLE_DATA",e.NO_IMAGE_FILE_SELECTED="NO_IMAGE_FILE_SELECTED"}(a||(a={}));class i{constructor({maxImageWidth:e=200,exportFormat:t=r.PNG,exportQuality:o=.7}){if(e<0||isNaN(e))throw new Error("`maxImageWidth` should be positive number");if(!Object.values(r).includes(t))throw new Error(`"exportFormat" must be one of: ${Object.values(r).toString()}`);if(isNaN(o)||o<0||o>1)throw new Error("`exportQuality` must be between 0 and 1");this.maxImageWidth=e,this.exportFormat=t,this.exportQuality=o}cleanUp(e){document.body.removeChild(e)}imageLoaded(e){return new Promise(((t,o)=>{const r=document.createElement("canvas"),i=r.getContext("2d"),n=this.maxImageWidth<e.width?e.width/this.maxImageWidth:1;r.width=e.width/n,r.height=e.height/n,null==i||i.drawImage(e,0,0,r.width,r.height);const s=new FileReader;s.onloadend=()=>{const{result:o}=s;this.cleanUp(e),t((null==o?void 0:o.toString())||"")},s.onerror=()=>{this.cleanUp(e),o(a.COULD_NOT_READ)},s.onabort=()=>{this.cleanUp(e),o(a.ABORTED)},console.log(this.exportFormat,this.exportQuality),r.toBlob((t=>{null!==t?s.readAsDataURL(t):(this.cleanUp(e),o(a.EMPTY_TRANSFER))}),this.exportFormat,this.exportQuality)}))}imageData(e){return new Promise(((t,o)=>{const r=document.createElement("img");document.body.appendChild(r),r.style.position="fixed",r.style.opacity="0",r.style.left=-100*this.maxImageWidth+"px",r.addEventListener("load",(()=>{t(this.imageLoaded(r))})),r.addEventListener("error",(()=>{o(a.IMAGE_COULD_NOT_LOADED),this.cleanUp(r)})),r.src=e}))}onChange(e){const t=e.target;return new Promise(((e,o)=>{if((null==t?void 0:t.files)&&t.files.length>0){const r=new FileReader;r.onload=t=>{var r;const i=null===(r=t.target)||void 0===r?void 0:r.result;i?e(this.imageData(i.toString())):o(a.FILE_HAS_NO_READIBLE_DATA)},r.readAsDataURL(t.files[0])}else o(a.NO_IMAGE_FILE_SELECTED)}))}}const n=(e,t)=>new i({maxImageWidth:e,exportFormat:r.PNG,exportQuality:t}),s=(e,t)=>new i({maxImageWidth:e,exportFormat:r.JPG,exportQuality:t}),l=(e,t)=>new i({maxImageWidth:e,exportFormat:r.WEBP,exportQuality:t}),d=i}},t={};function o(r){if(t[r])return t[r].exports;var a=t[r]={exports:{}};return e[r](a,a.exports,o),a.exports}return o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(925)})();
//# sourceMappingURL=save-image-as.js.map