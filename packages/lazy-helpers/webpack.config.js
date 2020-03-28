const { envFn } = require('env-fn')
envFn('special')

const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

process.env.NODE_ENV = 'development'

const envToPass = [
  'API_ACCESS_TOKEN',
  'NGROK_URL',
  'NODE_ENV',
  'ZAPIER_BUFFER_URL',
]

const plugins = [
  new HtmlWebpackPlugin({
    title             : 'lazy.helpers',
    alwaysWriteToDisk : true,
    favicon           : './files/favicon.ico',
  }),
  new HtmlWebpackHarddiskPlugin(),
  new webpack.EnvironmentPlugin(envToPass),
  new webpack.HotModuleReplacementPlugin(),
]

const devServer = {
  contentBase      : './dist',
  disableHostCheck : true,
  headers          : { 'Access-Control-Allow-Origin' : '*' },
  hot              : true,
  watchOptions     : { poll : 30 },
}

const entry = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  './src/index.jsx',
]

const output = {
  pathinfo : false,
  filename : 'bundle.js',
  path     : __dirname + '/dist',
}

const fileRule = {
  test    : /\.jsx?$/,
  loader  : [ 'thread-loader', 'babel-loader' ],
  include : `${ __dirname }/src`,
}

const cssRule = {
  test : /\.css$/,
  use  : [ 'style-loader', 'css-loader' ],
}

const rules = [ fileRule, cssRule ]

module.exports = {
  mode    : 'development',
  devServer,
  entry,
  output,
  plugins,
  resolve : { extensions : [ '.jsx', '.js' ] },
  module  : { rules },
}
