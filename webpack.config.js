const path = require("path");

module.exports = {
	entry: "./src/index.js",
	mode: "production",
	module: {
		rules: [
			{
				test: /\.js$/,
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
