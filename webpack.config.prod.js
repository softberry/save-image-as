const { resolve } = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const buildPath = resolve(__dirname, "dist");
const base = require("./webpack.config.base");
const { plugins } = require("./webpack.config.dev");
const dev = require("./webpack.config.dev");
module.exports = [
  {
    ...dev,
    mode: "production",
  },
];
