/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
  static: path.resolve('static'),
  assets: 'assets',
};

module.exports = {
  entry: {
    app: `${PATHS.src}/index.tsx`,
    // app: ['@babel/polyfill', `${PATHS.src}/index.tsx`],
  },
  output: {
    filename: path.join('js', '[name].[hash].js'),
    chunkFilename: path.join('js', 'chunks', '[name].[hash].js'),
    path: PATHS.dist,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': PATHS.src,
      '@comp': path.resolve(PATHS.src, 'components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)?$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                'react-hot-loader/babel',
                'babel-plugin-parameter-decorator',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
          'ts-loader',
        ],
      },
      {
        // fonts
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: path.join(PATHS.assets, 'fonts', '[name].[ext]'),
        },
      },
      {
        // css
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        // scss
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true, // TODO
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: { path: path.resolve('postcss.config.js') },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: path.join('css', '[name].[hash].css'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(PATHS.src, PATHS.assets, 'images'),
          to: path.join(PATHS.assets, 'images'),
        },
        {
          from: path.join(PATHS.src, PATHS.assets, 'svg'),
          to: path.join(PATHS.assets, 'svg'),
        },
        {
          from: PATHS.static,
          to: '',
        },
      ],
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(PATHS.static, 'index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
