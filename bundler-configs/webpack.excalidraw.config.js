const path = require("node:path");
const webpack = require("webpack");
const excalidrawRoot = path.resolve(__dirname, "../excalidraw");

module.exports = {
  context: path.resolve(__dirname, "../excalidraw"),
  entry: path.resolve(__dirname, "../benchmarks/complex-entry.ts"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        type: "asset/source",
      },
    ],
  },
  output: {
    filename: "excalidraw-webpack.js",
    path: path.resolve(__dirname, "../dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@excalidraw/common": path.join(excalidrawRoot, "packages/common/src/index.ts"),
      "@excalidraw/element": path.join(excalidrawRoot, "packages/element/src/index.ts"),
      "@excalidraw/excalidraw": path.join(excalidrawRoot, "packages/excalidraw/index.tsx"),
      "@excalidraw/math": path.join(excalidrawRoot, "packages/math/src/index.ts"),
      "@excalidraw/utils": path.join(excalidrawRoot, "packages/utils/src/index.ts"),
      "@excalidraw/fractional-indexing": path.join(excalidrawRoot, "packages/fractional-indexing/src/index.ts"),
      "@excalidraw/laser-pointer": path.join(excalidrawRoot, "packages/laser-pointer/src/index.ts"),
    },
  },
  plugins: [new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })],
};
