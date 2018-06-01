/**
 * @author durban.zhang
 * @date 2018-05-31
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'Popbox.min.js',
    library: 'Popbox',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      options: {
        plugins: ['transform-async-to-generator', 'transform-strict-mode', 'transform-object-assign', 'transform-decorators-legacy'],
        presets: ['es2015', 'react', 'stage-0'],
      },
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=10240',
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
    }],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
    }),
    new webpack.DefinePlugin({
      'global.GENTLY': false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  externals: {
    moment: true,
    jquery: true,
  },
};
