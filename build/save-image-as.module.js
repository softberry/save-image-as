(()=>{var e={607:function(e,t,o){var a,i,r=this&&this.__createBinding||(Object.create?function(e,t,o,a){void 0===a&&(a=o),Object.defineProperty(e,a,{enumerable:!0,get:function(){return t[o]}})}:function(e,t,o,a){void 0===a&&(a=o),e[a]=t[o]}),n=this&&this.__exportStar||function(e,t){for(var o in e)"default"===o||Object.prototype.hasOwnProperty.call(t,o)||r(t,e,o)};a=[o,t,o(743)],void 0===(i=function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(o,t)}.apply(t,a))||(e.exports=i)},743:(e,t,o)=>{var a;void 0===(a=function(e,t){"use strict";var o,a;Object.defineProperty(t,"__esModule",{value:!0}),t.WEBP=t.JPEG=t.PNG=t.ERejectReason=t.EExportFormat=void 0,function(e){e.JPG="image/jpeg",e.PNG="image/png",e.GIF="image/gif",e.WEBP="image/webp",e.TIFF="image/tiff"}(o=t.EExportFormat||(t.EExportFormat={})),function(e){e.COULD_NOT_READ="COULD_NOT_READ",e.ABORTED="ABORTED",e.EMPTY_TRANSFER="EMPTY_TRANSFER",e.IMAGE_COULD_NOT_LOADED="IMAGE_COULD_NOT_LOADED",e.FILE_HAS_NO_READIBLE_DATA="FILE_HAS_NO_READIBLE_DATA",e.NO_IMAGE_FILE_SELECTED="NO_IMAGE_FILE_SELECTED"}(a=t.ERejectReason||(t.ERejectReason={}));class i{constructor({maxImageWidth:e=200,exportFormat:t=o.PNG,exportQuality:a=.7}){this.maxImageWidth=e,this.exportFormat=t,this.exportQuality=a}cleanUp(e){document.body.removeChild(e)}imageLoaded(e){return new Promise(((t,o)=>{const i=document.createElement("canvas"),r=i.getContext("2d"),n=this.maxImageWidth<e.width?e.width/this.maxImageWidth:1;i.width=e.width/n,i.height=e.height/n,null==r||r.drawImage(e,0,0,i.width,i.height);const s=new FileReader;s.onloadend=()=>{const{result:o}=s;this.cleanUp(e),t((null==o?void 0:o.toString())||"")},s.onerror=()=>{this.cleanUp(e),o(a.COULD_NOT_READ)},s.onabort=()=>{this.cleanUp(e),o(a.ABORTED)},i.toBlob((t=>{null!==t?s.readAsDataURL(t):(this.cleanUp(e),o(a.EMPTY_TRANSFER))}),this.exportFormat,this.exportQuality)}))}imageData(e){return new Promise(((t,o)=>{const i=document.createElement("img");document.body.appendChild(i),i.style.position="fixed",i.style.opacity="0",i.style.left=-100*this.maxImageWidth+"px",i.addEventListener("load",(()=>{t(this.imageLoaded(i))})),i.addEventListener("error",(()=>{o(a.IMAGE_COULD_NOT_LOADED),this.cleanUp(i)})),i.src=e}))}onChange(e){const t=e.target;return new Promise(((e,o)=>{if((null==t?void 0:t.files)&&t.files.length>0){const i=new FileReader;i.onload=t=>{var i;const r=null===(i=t.target)||void 0===i?void 0:i.result;r?e(this.imageData(r.toString())):o(a.FILE_HAS_NO_READIBLE_DATA)},i.readAsDataURL(t.files[0])}else o(a.NO_IMAGE_FILE_SELECTED)}))}}t.PNG=(e,t)=>new i({maxImageWidth:e,exportFormat:o.PNG,exportQuality:t}),t.JPEG=(e,t)=>new i({maxImageWidth:e,exportFormat:o.JPG,exportQuality:t}),t.WEBP=(e,t)=>new i({maxImageWidth:e,exportFormat:o.WEBP,exportQuality:t})}.apply(t,[o,t]))||(e.exports=a)}},t={};!function o(a){if(t[a])return t[a].exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,o),i.exports}(607)})();