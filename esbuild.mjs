import { build } from "esbuild";

const res = await build({
	jsx: "automatic",
	bundle: true,
	loader: {
		".js": "jsx",
	},
	outfile: "dist/esbuild-bundle.js",
	write: true,
});

console.log(res);
