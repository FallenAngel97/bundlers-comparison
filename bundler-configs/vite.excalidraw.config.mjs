import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoRoot = path.resolve(import.meta.dirname, "..");
const excalidrawRoot = path.join(repoRoot, "excalidraw");
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@excalidraw/common": path.join(excalidrawRoot, "packages/common/src/index.ts"),
      "@excalidraw/math": path.join(excalidrawRoot, "packages/math/src/index.ts"),
      "@excalidraw/element": path.join(excalidrawRoot, "packages/element/src/index.ts"),
      "@excalidraw/excalidraw": path.join(excalidrawRoot, "packages/excalidraw/index.tsx"),
    },
  },
  build: {
    rollupOptions: {
      input: path.join(repoRoot, "benchmarks/complex-entry.ts"),
    },
    outDir: path.join(repoRoot, "dist/excalidraw-vite"),
    emptyOutDir: true,
  },
});
