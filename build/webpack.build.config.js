/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new Dotenv({
      path: path.resolve('.env.production'),
    }),
    new MiniCssExtractPlugin({
      filename: path.join('css', '[name].[hash].css'),
    }),
  ],
  optimization: {
    splitChunks: {},
    // splitChunks: {
    //   chunks: 'all',
    //   minChunks: 2,
    //   cacheGroups: {
    //     vendor: {
    //       name: 'vendors',
    //       test: /node_modules/,
    //       // chunks: 'all',
    //       // enforce: true,
    //     },
    //   },
    // },
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ],
  },
});

module.exports = buildWebpackConfig;
