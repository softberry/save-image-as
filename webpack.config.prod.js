const path = require("path");

const srcPath = path.resolve(__dirname, "src");
const buildPathWeb = path.resolve(__dirname, "build");

const forBrowser = {
  entry: path.join(srcPath, "save-image-as.ts"),
  mode: "production",
  target: false,
  output: {
    path: buildPathWeb,
    filename: "save-image-as.js",
    library: "SaveImageAs",
    libraryTarget: "window",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },

  resolve: {
    extensions: ["*", ".js", ".ts"],
  },
};

module.exports = [
  forBrowser,
  {
    ...forBrowser,
    entry: path.join(srcPath, "index.ts"),
    target: "es6",
    output: {
      path: buildPathWeb,
      filename: "save-image-as.module.js",
    },
  },
];
