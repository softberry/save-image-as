const { resolve } = require("path");

const buildPath = resolve(__dirname, "build");
const base = require("./webpack.config.base");
const dev = require("./webpack.config.dev");
module.exports = [
  { ...dev, mode: "production" },
  {
    ...base,
    mode: "production",
    output: {
      path: buildPath,
      filename: "save-image-as.js",
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
  },
];
