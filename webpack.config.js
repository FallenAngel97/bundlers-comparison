const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	entry: "./src/index.jsx",
	mode: "production",
	optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", ["@babel/preset-react", {"runtime": "automatic"}]],
					},
				},
			},
		],
	},
	output: {
		filename: "webpack-bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
};
