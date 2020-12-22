const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const publicPath = resolve(__dirname, "public");
const buildPath = resolve(__dirname, "dist");

const base = require("./webpack.config.base");
module.exports = {
  ...base,
  mode: "development",
  output: {
    path: buildPath,
    filename: "save-image-as.js",
    library: "saveImageAs",
    libraryTarget: "global",
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
      template: join(publicPath, "index.html"),
      title: "Save Image As",
    }),
  ],
};
