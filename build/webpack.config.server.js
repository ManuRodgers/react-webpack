const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");

module.exports = webpackMerge(baseConfig, {
  target: "node", // web for front end and node for server side
  entry: {
    app: path.resolve(__dirname, "../client/server-entry.js")
  },
  output: {
    filename: "js/server-entry.js",
    libraryTarget: "commonjs2"
  }
});
