const path = require("path");
const { merge } = require('webpack-merge')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Common = require('./webpack.base.conf');

module.exports = merge(Common, {
    mode: "development",
    output: {
        filename: '[name].js',
        path: path.resolve(`./public`),
        publicPath: '/'
    },
    devServer: {
        port: 8080,
        compress: true,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            lang: 'en',
            filename: 'index.html',
            template: './src/index.html',
        }),
    ]
});
