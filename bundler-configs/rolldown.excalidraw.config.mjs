import path from "node:path";
import { defineConfig } from "rolldown";

export default defineConfig({
  input: path.resolve("benchmarks/complex-entry.ts"),
  output: {
    file: "dist/excalidraw-rolldown.js",
    format: "iife",
    codeSplitting: false,
    minify: true,
  },
  resolve: {
    extensions: [".mjs", ".js", ".json", ".ts", ".tsx"],
    alias: {
      "@excalidraw/common": path.resolve("excalidraw/packages/common/src/index.ts"),
      "@excalidraw/element": path.resolve("excalidraw/packages/element/src/index.ts"),
      "@excalidraw/excalidraw": path.resolve("excalidraw/packages/excalidraw/index.tsx"),
      "@excalidraw/math": path.resolve("excalidraw/packages/math/src/index.ts"),
      "@excalidraw/utils": path.resolve("excalidraw/packages/utils/src/index.ts"),
      "@excalidraw/fractional-indexing": path.resolve("excalidraw/packages/fractional-indexing/src/index.ts"),
      "@excalidraw/laser-pointer": path.resolve("excalidraw/packages/laser-pointer/src/index.ts"),
    },
  },
});
