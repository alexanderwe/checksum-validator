const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');

var config = {
    module: {}
};

var rendererConfig = Object.assign({}, config, {
    watch: true,
    target: 'electron',
    entry: './app/renderer/src/entry.js',
    output: {
        path: __dirname + '/app/renderer/build',
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0', 'stage-2', 'react'],
                    plugins: ['transform-object-rest-spread']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader'
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: false,
            allChunks: true
        }),
        new DashboardPlugin()
    ]
});

var mainConfig = Object.assign({}, config, {
    watch: true,
    target: 'electron-main',
    externals: [nodeExternals()],
    entry: './app/main/main.js',
    output: {
        path: path.resolve(__dirname, './app/main'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
});

module.exports = [rendererConfig];
