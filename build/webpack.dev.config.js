/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
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
