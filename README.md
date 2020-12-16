# Save Image As:

Convert any image format to `JPG` or `PNG` in browser to Base64 format.

## How To Use:

1- **Create constructor with (or without) options**:

    const { onChange } = new ImageData();

2- **Create Custom handler for using image data**

    function myCustomImageHandler(event){
        onChange(event)
        .then(data=>{
            // Use your date as you like
        })
    }

3- **Assign `myCustomImageHandler` to file upload element's `onChange` method:**

    const fileInput = document.getElementById("upload");
    fileInput.addEventListener("change",myCustomImageHandler);

**or**

    <input type="file" accept=".jpg,.png,.svg,.tiff" id="upload" onChange="myCustomImageHandler">

| Option        | Default | Description                                 |
| ------------- | ------- | ------------------------------------------- |
| maxImageWidth | 200     | Define maximum width for the exported image |
| exportFormat  | PNG     | Convert source image to `JPG` or `PNG`      |
