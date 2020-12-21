const { resolve } = require("path");

const buildPath = resolve(__dirname, "dist");
const base = require("./webpack.config.base");
const dev = require("./webpack.config.dev");
module.exports = [
  { ...dev, mode: "production" },
  // {
  //   ...base,
  //   optimization: { minimize: false },
  //   mode: "production",
  //   devtool: "source-map",
  //   output: {
  //     path: buildPath,
  //     filename: "index.js",
  //   },

  //   resolve: {
  //     extensions: ["*", ".js", ".ts"],
  //   },
  // },
];
