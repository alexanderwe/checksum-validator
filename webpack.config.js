const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const tsImportPluginFactory = require('ts-import-plugin');
const path = require('path');
module.exports = function(env) {
  console.log(env);
  let config = {
    module: {},
  };

  let rendererConfig = Object.assign({}, config, {
    watch: env.mode == 'watch' ? true : false,
    target: 'electron-renderer',
    node: {
      __dirname: false,
      __filename: false,
    },
    entry: './app/renderer/src/entry.tsx',
    output: {
      path: __dirname + '/app/build/',
      publicPath: 'build/',
      filename: 'renderer.js',
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(jsx|tsx|js|ts)$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                  before: [tsImportPluginFactory(/** options */)],
                }),
                compilerOptions: {
                  module: 'es2015',
                },
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          // regular css files
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: 'css-loader?importLoaders=1',
          }),
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract(['css-loader', 'less-loader']),
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              query: {
                name: '[name].[ext]?[hash]',
              },
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
          use: [{ loader: 'url-loader' }],
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'bundle.css',
        disable: false,
        allChunks: true,
      }),
      new DashboardPlugin(),
    ],
  });

  let mainConfig = Object.assign({}, config, {
    entry: './app/main/src/main.ts',
    target: 'electron-main',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()],
    watch: env.mode == 'watch' ? true : false,
    output: {
      filename: './app/build/main.js',
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          use: [{ loader: 'awesome-typescript-loader' }],
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'app/lib/i18n/', to: 'app/build/', ignore: ['*.ts'] },
      ]),
      new DashboardPlugin(),
    ],
  });

  return [rendererConfig, mainConfig];
};
