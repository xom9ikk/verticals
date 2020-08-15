/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new Dotenv({
      path: path.resolve('.env.development'),
    }),
    new MiniCssExtractPlugin({
      filename: path.join('css', '[name].css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)?$/,
        exclude: '/node_modules/',
        loader: 'tslint-loader',
      },
    ],
  },
});

module.exports = devWebpackConfig;
