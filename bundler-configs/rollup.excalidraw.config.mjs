import path from "node:path";
import { babel } from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: path.resolve("benchmarks/complex-entry.ts"),
  output: {
    file: "dist/excalidraw-rollup.js",
    format: "iife",
    inlineDynamicImports: true,
  },
  plugins: [
    alias({
      entries: {
        "@excalidraw/common": path.resolve("excalidraw/packages/common/src/index.ts"),
        "@excalidraw/element": path.resolve("excalidraw/packages/element/src/index.ts"),
        "@excalidraw/excalidraw": path.resolve("excalidraw/packages/excalidraw/index.tsx"),
        "@excalidraw/math": path.resolve("excalidraw/packages/math/src/index.ts"),
        "@excalidraw/utils": path.resolve("excalidraw/packages/utils/src/index.ts"),
        "@excalidraw/fractional-indexing": path.resolve("excalidraw/packages/fractional-indexing/src/index.ts"),
        "@excalidraw/laser-pointer": path.resolve("excalidraw/packages/laser-pointer/src/index.ts"),
      },
    }),
    nodeResolve({ browser: true, extensions: [".mjs", ".js", ".json", ".ts", ".tsx"] }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      presets: [
        ["@babel/preset-env", { targets: "defaults" }],
        "@babel/preset-typescript",
        ["@babel/preset-react", { runtime: "automatic" }],
      ],
    }),
  ],
};
