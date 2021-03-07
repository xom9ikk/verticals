/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
  static: path.resolve('static'),
  public: 'public',
};

module.exports = {
  target: 'web',
  entry: {
    app: ['@babel/polyfill', `${PATHS.src}/index.tsx`],
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
      '@helpers': path.resolve(PATHS.src, 'helpers'),
      '@inversify': path.resolve(PATHS.src, 'inversify'),
      '@layouts': path.resolve(PATHS.src, 'layouts'),
      '@pages': path.resolve(PATHS.src, 'pages'),
      '@plugins': path.resolve(PATHS.src, 'plugins'),
      '@router': path.resolve(PATHS.src, 'router'),
      '@services': path.resolve(PATHS.src, 'services'),
      '@store': path.resolve(PATHS.src, 'store'),
      '@type': path.resolve(PATHS.src, 'types'),
      '@use': path.resolve(PATHS.src, 'use'),
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
                '@babel/preset-typescript',
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                'babel-plugin-parameter-decorator',
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
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
          from: path.join(PATHS.src, PATHS.public),
          to: '',
        },
        {
          from: PATHS.static,
          to: '',
        },
      ],
    }),
    new HTMLWebpackPlugin({
      title: 'Verticals — checklist with vertical separation',
      description: 'TODO Checklist With Vertical Separation',
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
