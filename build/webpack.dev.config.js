/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3001,
    open: true,
    compress: true,
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2 } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  autoprefixer,
                  cssnano({
                    preset: [
                      'default',
                      {
                        discardComments: {
                          removeAll: true,
                        },
                      },
                    ],
                  }),
                ],
              },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({ path: path.resolve('.env.development') }),
    // new ESLintPlugin({ extensions: ['ts', 'tsx'], exclude: '/node_modules/' }),
    new ReactRefreshWebpackPlugin(),
  ],
});

module.exports = devWebpackConfig;
