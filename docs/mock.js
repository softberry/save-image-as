function createElements(source, target) {
  var el = document.createElement("div");
  var img = document.createElement("img");
  var input = document.createElement("input");
  img.id = target;
  input.type = "file";
  input.id = source;
  el.appendChild(img);
  el.appendChild(input);

  var container = document.querySelector(".container");
  container.appendChild(el);
  return { img: img, input: input };
}
function convertOnChange(fileInput, targetImg, toBase64) {
  console.log(fileInput.id);
  fileInput &&
    fileInput.addEventListener("change", function (e) {
      toBase64
        .onChange(e)
        .then(function (base) {
          console.log("done!");
          targetImg.src = base;
          targetImg.title = base.slice(0, 32);
        })
        .catch(function (err) {
          console.log("error: ", err);
        });
    });
}
var formatMatrix = [
  { src: "Png", targets: ["Png", "Jpeg", "Webp"] },
  { src: "Jpeg", targets: ["Png", "Jpeg", "Webp"] },
  { src: "Webp", targets: ["Png", "Jpeg", "Webp"] },
];
var maxImageWidth = 200;
var elementsMatrix = [];

window.addEventListener("load", function () {
  const toBase64 = {
    Png: saveImageAs.PNG(maxImageWidth, 1),
    Jpeg: saveImageAs.JPG(maxImageWidth, 1),
    Webp: saveImageAs.WEBP(maxImageWidth, 1),
  };

  for (var i = 0; i < formatMatrix.length; i++) {
    var src = formatMatrix[i].src;
    var targets = formatMatrix[i].targets;
    for (var t = 0; t < targets.length; t++) {
      var target = targets[t];
      var elements = createElements(
        "imageFile" + src + "To" + target,
        "result" + src + "To" + target
      );
      elementsMatrix.push([elements.input, elements.img, toBase64[target]]);
    }
  }
});
window.addEventListener("load", function () {
  for (var i = 0; i < elementsMatrix.length; i++) {
    var el = elementsMatrix[i];

    convertOnChange(el[0], el[1], el[2]);
  }
});
