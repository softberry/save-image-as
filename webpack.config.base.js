const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const srcPath = path.resolve(__dirname, "src");

module.exports = {
  entry: path.join(srcPath, "index.ts"),

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
