const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const tsImportPluginFactory = require('ts-import-plugin');
const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './app/renderer/src/styles/ant-default-vars.less'), 'utf8'));
themeVariables["@icon-url"] = "'/'";

module.exports = function (env) {
  console.log(env);
  let config = {
    module: {},
  };

  let rendererConfig = Object.assign({}, config, {
    mode: 'production',
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
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                getCustomTransformers: () => ({
                  before: [
                    tsImportPluginFactory({
                      libraryName: 'antd',
                      libraryDirectory: 'lib',
                      style: true,
                    }),
                  ],
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
          test: /\.(less|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "less-loader",
              options: {
                modifyVars: themeVariables
              }
            }
          ]
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
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "bundle.css",
        chunkFilename: "[id].css"
      }),
    ],
  });

  let mainConfig = Object.assign({}, config, {
    mode: 'production',
    entry: './app/main/src/main.ts',
    target: 'electron-main',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()],
    watch: env.mode == 'watch' ? true : false,
    output: {
      path: __dirname + '/app/build/',
      publicPath: 'build/',
      filename: 'main.js',
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'app/lib/i18n/', to: './', ignore: ['*.ts'] },
      ]),
    ],
  });

  return [mainConfig, rendererConfig];
};