import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

export default {
	input: "src/index.js",
	output: {
		file: "dist/rollup-bundle.js",
		format: "iife",
		inlineDynamicImports: true,
	},
	plugins: [
		replace({
			preventAssignment: true,
			"process.env.NODE_ENV": JSON.stringify("production"),
		}),
		nodeResolve({
			browser: true,
			preferBuiltins: false,
		}),
		commonjs({
			include: /node_modules/, // ensures react/react-dom get bundled
			transformMixedEsModules: true,
		}),
		babel({
			babelHelpers: "bundled",
			presets: [
				[
					"@babel/preset-env",
					{
						useBuiltIns: "usage",
						corejs: "3",
					},
				],
				["@babel/preset-react", { runtime: "automatic" }],
			],
		}),
	],
};
