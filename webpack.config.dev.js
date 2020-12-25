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
    libraryTarget: "window",
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    },
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
        options: { configFile: "tsconfig-es5.json" },
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
      inject: "head",
      title: "Save Image As",
    }),
  ],
};
