import { defineConfig } from '@farmfe/core';

export default defineConfig({
	compilation: {
    input: {
      index: './src/index.js'
    },
		comments: false,
    output: {
			entryFilename: 'farm-bundle.js',
      path: 'dist',
      publicPath: '/',
      targetEnv: 'browser'
    },
		partialBundling: {
      enforceResources: [
        {
          name: 'full-bundle',
          test: ['.+'], // matches all modules
        },
      ],
    },
		mode: 'production',
		minify: true,
  },
  plugins: [
		['@farmfe/plugin-react', { runtime: "automatic" }]
	]
});

