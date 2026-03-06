import { defineConfig } from 'rolldown';

export default defineConfig({
	input: "src/index.jsx",
	output: {
		file: "dist/rolldown-bundle.js",
		format: "iife",
		codeSplitting: false,
		minify: true
	},
	treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false
  }
});

