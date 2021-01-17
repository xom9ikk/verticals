/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
  static: path.resolve('static'),
  assets: 'assets',
};

module.exports = {
  target: 'web',
  entry: {
    app: `${PATHS.src}/index.tsx`,
    // app: ['@babel/polyfill', `${PATHS.src}/index.tsx`],
  },
  output: {
    filename: path.join('js', '[name].[fullhash].js'),
    chunkFilename: path.join('js', 'chunks', '[name].[fullhash].js'),
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
                'babel-plugin-parameter-decorator',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(PATHS.src, PATHS.assets),
          to: PATHS.assets,
        },
        {
          from: PATHS.static,
          to: '',
        },
      ],
    }),
    new HTMLWebpackPlugin({
      title: 'App title',
      favicon: path.resolve(PATHS.static, 'favicon.ico'),
      template: path.resolve(PATHS.static, 'index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
