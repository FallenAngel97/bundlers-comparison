// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	exclude: ['**/my-app/**/*'],
  mount: {
    /* ... */
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
		external: [
			"fs",
			"url",
			"path",
			"module",
			"util",
			"rollup", 
			"webpack", 
			"esbuild", 
			"rolldown",
			"@farmfe/core",
			"jest-worker",
			"esinstall"
		]
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
		jsxInject: "import React from 'react'"
  },
};
