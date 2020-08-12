/* eslint-disable no-useless-escape,no-template-curly-in-string */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const settings = {
  distPath: path.join(__dirname, 'dist'),
  srcPath: path.join(__dirname, 'src'),
};

const filename = (ext) => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

const tsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          'react-hot-loader/babel',
          'babel-plugin-parameter-decorator',
        ],
      },
    },
    'ts-loader',
  ];

  if (isDev) {
    loaders.push('tslint-loader');
  }

  return loaders;
};

module.exports = {
  context: settings.srcPath,
  mode: 'development',
  entry: ['@babel/polyfill', './index.tsx'],
  output: {
    filename: filename('js'),
    path: settings.distPath,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': settings.srcPath,
      '@comp': path.resolve(__dirname, settings.srcPath, 'components'),
      '@svg': path.resolve(__dirname, settings.srcPath, 'assets', 'svg'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3001,
    hot: isDev,
    historyApiFallback: true,
    publicPath: '/',
    overlay: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
        auth: {
          name: 'auth.page',
          test: /pages\/auth/,
          chunks: 'all',
          enforce: true,
        },
        board: {
          name: 'board',
          test: /pages\/main/,
          chunks: 'all',
          enforce: true,
        },
        components: {
          name: 'components',
          test: /components/,
          chunks: 'all',
          enforce: true,
        },
        store: {
          name: 'store',
          test: /store/,
          chunks: 'all',
          enforce: true,
        },
        assets: {
          name: 'assets',
          test: /assets/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'public', 'favicon.ico'),
        to: settings.distPath,
      }],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.ts(x?)?$/,
        exclude: /node_modules/,
        use: tsLoaders(),
      },
      {
        test: /\.(ttf|woff(2?)|eot|png|jp(e?)g|gif|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        exclude: /node_modules/,
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
};
