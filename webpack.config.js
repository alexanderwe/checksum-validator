const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');

// TODO: check replacement of loader with use
var config = {
    module: {}
};

var rendererConfig = Object.assign({}, config, {
    watch: true,
    target: 'electron-renderer',
    entry: './app/renderer/src/entry.tsx',
    output: {
        path: __dirname + '/app/renderer/build',
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader')
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        query: {
                            name: '[name].[ext]?[hash]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
                use: [
                    {
                        loader: 'url-loader'
                    }
                ]
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
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        loaders: [{ test: /.ts$/, loader: 'awesome-typescript-loader' }]
    },
    plugins: [new CopyWebpackPlugin([{ from: 'app/main/src/i18n/', to: 'app/main/build/' }], { ignore: ['*.ts'] }), new DashboardPlugin()]
});

module.exports = [rendererConfig, mainConfig];
