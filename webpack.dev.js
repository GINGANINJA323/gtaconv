const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./index.tsx",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-typescript"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: [".ts", ".js", ".tsx"] },
  output: {
    path: "/public/dist",
    publicPath: "/public/dist",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index',
      template: './public/index.ejs'
    })
  ]
};