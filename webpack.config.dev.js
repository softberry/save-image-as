const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const publicPath = path.resolve(__dirname, "public");
const srcPath = path.resolve(__dirname, "src");
const buildPathWeb = path.resolve(__dirname, "build");

const forBrowser = {
  entry: path.join(srcPath, "save-image-as.ts"),
  mode: "development",
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

  devtool: "source-map",

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(publicPath, "index.html"),
      title: "Save Image As",
    }),
  ],
};

module.exports = forBrowser;
