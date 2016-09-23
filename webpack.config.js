var webpack = require('webpack');
var path = require("path");
var fs = require('fs');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var lib_dir = __dirname + '/public/libraries',
    node_dir = __dirname + '/node_modules',
    bower_dir = __dirname + '/bower_components',
    plugins_dir = __dirname + '/public/plugins';

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
  entry: {
    bundle: [
      './src/Server.js',
    ]
  },
  target: 'node',// tells webpack not to touch any built-in modules like fs or path.
  output: {
    path: './build',
    filename: 'Server.min.js',
  },
  externals: nodeModules,
  resolve: {
    alias: {},
    extensions: ['', '.js', 'json']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      }
    ]
  },
  devServer: {
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      // 'process': "process",
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css"),
    new webpack.IgnorePlugin(/\.(css|less)$/),
    /*new webpack.BannerPlugin('require("source-map-support").install();',
        {raw: true, entryOnly: false})*/
  ],
  //devtool: 'sourcemap'
};
