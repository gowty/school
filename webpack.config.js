var path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 5000,
    compress: true,
    hot: false,
    open: true,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-1"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      }
    ]
  }
};
