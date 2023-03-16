const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

require("dotenv").config({ path: "./.env" });

const path = require("path");
module.exports = {
	mode: "none",
	entry: {
		index: path.resolve(__dirname, "src", "index.js"),
	},
	module: {
		rules: [
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
		new CopyPlugin({
			patterns: [
				{
					from: "public/resource",
					to: "resource",
				}, //to the dist root directory
			],
		}),
		new Dotenv({
			path: "./.env",
			systemvars: true,
		}),
		new webpack.DefinePlugin({
			"process.env": JSON.stringify(process.env),
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
