/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [],
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
