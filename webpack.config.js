const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
	mode: "none",
	entry: {
		index: path.resolve(__dirname, "src", "index.js"),
	},
	module: {
		rules: [
			{
				test: /\.filename$/,
				use: ["loader-b", "loader-a"],
			},
			{
				test: /\.html$/,
				loader: "html-loader",
			},
			{
				test: /\.(png|jpg)$/i,
				type: "asset/resource",
				generator: {
					filename: "images/[name][ext]",
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(
				__dirname,
				"src",
				"index.html"
			),
			inject: "body",
		}),
	],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	optimization: {
		chunkIds: "named",
		concatenateModules: true,
	},
};
