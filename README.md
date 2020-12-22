# Save Image As:

Convert any image format to `JPG` , `PNG` or `WEBP` in browser to Base64 format.

## How To Use

Get this package from npm:
`npm install save-image-as` or `yarn add save-image-as`

If you do not have a build routine (webpack, rollout etc.) simply include save-image-as script over an cdn in your html file for example : `<script src="https://unpkg.com/browse/save-image-as@latest/dist/save-image-as.js"` />.

In all JavaScript frame works (ReactJS, Angular, Vue ,etc) import this package like this:
`import {PNG, /*JPG,WEBP*/} from "save-image-as"` then assign onChange method as your file input's onChange evant handler.

1- **Create constructor with (or without) options**:

    const saveImageAs = new SaveImageAs.PNG(200, .5);
    // or // const saveImageAs = new SaveImageAs.JPG(200, .5);
    // or // const saveImageAs = new SaveImageAs.WEBP(200, .5);

2- **Create Custom handler for using image data**

    function myCustomImageHandler(event){
        saveImageAs.onChange(event)
        .then(data=>{
            // Use your date as you like
        })
    }

3- **Assign `myCustomImageHandler` to file upload element's `onChange` method:**

    const fileInput = document.getElementById("upload");
    fileInput.addEventListener("change",myCustomImageHandler);

    // see a working example in public folder

**or**

    <input type="file" accept=".jpg,.png,.svg,.tiff" id="upload" onChange="myCustomImageHandler">

| Option          | Default | Description                                            |
| --------------- | ------- | ------------------------------------------------------ |
| `maxImageWidth` | 200     | Define maximum width for the exported image            |
| `exportQuality` | .75     | Quality of exported image. Value must be between 0 - 1 |

## Errors :

| Error Code                  | Description                                                         |
| --------------------------- | ------------------------------------------------------------------- |
| `COULD_NOT_READ`            | Selected file may be corrupt or not an image file.                  |
| `ABORTED`                   | File selection cancelled                                            |
| `EMPTY_TRANSFER`            | Converted result data has no content.                               |
| `IMAGE_COULD_NOT_LOADED`    | Selected image could not load. Maybe a network error or disk error. |
| `FILE_HAS_NO_READIBLE_DATA` | Selected file has no readible content.                              |
| `NO_IMAGE_FILE_SELECTED`    | Trying to transfer befor selecting an image file.                   |

## JavaScript Frameworks:
