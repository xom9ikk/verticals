/* eslint-disable import/no-extraneous-dependencies,no-console */
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpackConfig = require('./webpack.production.config');

const green = (text) => chalk.green.bold(text);

webpackConfig.plugins.push(new BundleAnalyzerPlugin());
webpackConfig.plugins.push(
  new ProgressBarPlugin({
    format: `${green('analyzing...')} ${green('[:bar]')}${green('[:percent]')}${green('[:elapsed seconds]')} - :msg`,
  }),
);

webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err);
  }
});
