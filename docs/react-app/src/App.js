import { useState } from "react";
import { PNG } from "save-image-as";
const toBase64 = PNG(200, 0.5);
function App() {
  const [imageData, setImageData] = useState("");
  const handleImageSelect = event => {
    toBase64.onChange(event).then(data => {
      setImageData(data);
    });
  };

  return (
    <div>
      {imageData ? <img src={imageData} alt="selected data preview" /> : <div>Select an Image</div>}

      <input type="file" accept=".jpg,.jpeg,.png,.svg,.tiff" onChange={handleImageSelect} />
    </div>
  );
}

export default App;
