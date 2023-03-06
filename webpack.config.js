const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "none",
	entry: ["./src/index.js", "./src/styles/main.css"],
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		extensions: ["*", ".js"],
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "index_bundle.js",
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
		},
		compress: true,
		port: 9000,
	},
	plugins: [new HtmlWebpackPlugin()],
};
