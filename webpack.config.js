var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

// If you get the message “loaderUtils.parseQuery() received a non-string value...” uncomment next line
// process.traceDeprecation = true;

module.exports = {
  entry: {
    fetchLoader: ['babel-polyfill', './html/renderFetchLoader.js'],
    filterList: ['babel-polyfill', './html/renderFilterList.js'],
    dependencies: ['prop-types', 'react', 'react-dom', 'urijs', 'react-select']
  },

  output: {
    library: '[name]',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/html/'
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {verbose: true, dry: false}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'dependencies',
      filename: 'vendorCommons.bundle.js',
      minChunks: Infinity     // Explicit definition-based split, see dependencies entry
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: process.env.NODE_ENV === 'production' ?
        JSON.stringify("production") : JSON.stringify("development")
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules\//,
        use: 'babel-loader'
      }
    ]
  },

  devServer: {
    port: 9000
  }
};
