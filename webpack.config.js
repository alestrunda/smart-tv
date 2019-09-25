const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/i,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), new CopyPlugin([{ from: "static" }])],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  }
};
