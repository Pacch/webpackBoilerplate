const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const fs = require('fs');

// all archivos pug
let templates = [];
let dir = 'src/views';
let files = fs.readdirSync(dir);

files.forEach((file) => {
	if (file.match(/\.pug$/)) {
		let filename = file.substring(0, file.length - 4);
		templates.push(
			new HtmlWebpackPlugin({
				template: dir + '/' + filename + '.pug',
				filename: filename + '.html'
			})
		);
	}
});

module.exports = {
	entry: {
		js: path.resolve(__dirname, 'src/js/bundle.js')
	},
	output: {
		// path: path.resolve(__dirname, 'dist/js'),
		filename: 'js/[name].[chunkhash].js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.pug$/,
				use: [ 'pug-loader' ]
			},
			{
				test: /\.s?css$/,
				use: [
					MiniCSSExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							autoprefixer: {
								browser: [ 'last 2 versions' ]
							},
							sourceMap: true,
							plugins: () => [ autoprefixer ]
						}
					},
					'resolve-url-loader',
					'sass-loader?outputStyle=compressed&sourceMap'
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg|webp)$/i,
				use: [ 'file-loader?name=assets/[name].[ext]', 'image-webpack-loader?bypassOnDebug' ]
			},
			{
				test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
				use: 'file-loader?name=assets/[name].[ext]'
			}
		]
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	},
	plugins: [
		// descomentar si desean usar jquery de forma global
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// 	jQuery: 'jquery'
		// }),
		new MiniCSSExtractPlugin({
			filename: 'css/[name].[chunkhash].css',
			chunkFilename: '[id].css'
		}),
		new CleanWebpackPlugin([ path.resolve(__dirname, 'dist/**/*.*') ]),
		// new HtmlWebpackPlugin({
		// 	template: path.resolve(__dirname, 'src/views/index.pug'),
		// 	filename: 'index.html',
		// 	chunks: [ 'js' ]
		// }),
		...templates,
		new HtmlWebpackPugPlugin()
	]
};
