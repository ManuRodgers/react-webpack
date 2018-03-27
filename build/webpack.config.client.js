const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const webpack = require("webpack");

const config = webpackMerge(baseConfig, {
  target: "web",
  entry: {
    app: path.join(__dirname, "../client/app.js")
  },
  output: {
    filename: "js/[name].[hash].js"
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../client/index.html")
    })
  ]
});

// hot module replacement can only be used in development mode
if (config.mode === "development") {
  // change entry point to react-hot-loader/patch

  config.entry = {
    app: ["react-hot-loader/patch", path.join(__dirname, "../client/app.js")]
  };
  // under development mode then configure the devServer object
  config.devServer = {
    host: "0.0.0.0",
    port: 8888,
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: "/public/",
    historyApiFallback: {
      index: "/public/index.html"
    }
  };

  // push HotModuleReplacementPlugin into plugins array
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
