'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    javascript: `./graphiql/src/index.js`,
    html: `./graphiql/src/index.html`
  },
  output: {
    filename: 'index.js',
    path: __dirname + '/dist'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  devServer: {hot: true},
  plugins: [new webpack.HotModuleReplacementPlugin()],
  progress: true,
  colors: true
};
