const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');

var config = {
    module: {}
};

var rendererConfig = Object.assign({}, config, {
    watch: true,
    target: 'electron-renderer',
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
    entry: './app/main/src/main.ts',
    target: 'electron-main',
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [nodeExternals()],
    watch: true,
    output: {
        filename: './app/main/build/main.js'
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        loaders: [{ test: /.ts$/, loader: 'awesome-typescript-loader' }]
    }
});

module.exports = [rendererConfig, mainConfig];
