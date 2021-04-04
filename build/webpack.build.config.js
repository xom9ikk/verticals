/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
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
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    new Dotenv({
      path: path.resolve('.env.production'),
    }),
    new MiniCssExtractPlugin({
      filename: path.join('css', '[name].[contenthash].css'),
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx'],
      exclude: '/node_modules/',
    }),
  ],
  optimization: {
    // splitChunks: {},
    splitChunks: {
      chunks: 'all',
      // minChunks: 2,
      // cacheGroups: {
      //   vendor: {
      //     name: 'vendors',
      //     test: /node_modules/,
      //     // chunks: 'all',
      //     // enforce: true,
      //   },
      // },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ],
  },
});

module.exports = buildWebpackConfig;
