const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./index.tsx",
  mode: "production",
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
    path: path.resolve(__dirname, "public/dist/"),
    publicPath: "/public/dist/",
    filename: "bundle.js"
  },
  plugins: []
};