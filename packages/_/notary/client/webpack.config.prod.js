process.env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')
const { WebpackBundleSizeAnalyzerPlugin } = require('webpack-bundle-size-analyzer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const WebpackMonitor = require('webpack-monitor');

const clean = new CleanWebpackPlugin(['dist'])
const report = new WebpackBundleSizeAnalyzerPlugin('./plain-report.txt')
const monitor = new WebpackMonitor({
  capture: true,
  launch: true,
})
const envs = new webpack.EnvironmentPlugin([
  'NODE_ENV',
])
const hash = new webpack.HashedModuleIdsPlugin()
const vendorChunk = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor'
})
const runtimeChunk = new webpack.optimize.CommonsChunkPlugin({
  name: 'runtime'
})
const extractLess = new ExtractTextPlugin({
  filename : '[name].[contenthash].css',
  disable  : false,
})
const html = new HtmlWebpackPlugin({
  title             : 'DEV',
  xhtml             : true,
  alwaysWriteToDisk : true,
  favicon           : './files/favicon.ico',
})
const uglify = new UglifyJSPlugin({
  sourceMap: true
})

const plugins = [
  clean,
  // report,
  // monitor,
  envs,
  hash,
  vendorChunk,
  runtimeChunk,
  extractLess,
  html,
  uglify,
]

const vendors = [
  'react-router',
  'react-redux',
  'history',
  'redux',
  'rambdax',
  'react',
  'react-dom',
]

const entry = {
  main   : './src/index.tsx',
  vendor : vendors,
}

const tsxLoader = [
  'awesome-typescript-loader',
]

const typescriptRule = {
  test    : /\.tsx?$/,
  loader  : tsxLoader,
  include : [ `${ __dirname }/src`, `${ __dirname }/node_modules/notify/` ],
  exclude : [ /node_modules\/(?!(notify)\/).*/ ],
}

const cssRule = {
  test : /\.css$/,
  use  : [ 'style-loader', 'css-loader' ],
}

const lessRule = {
  test : /\.less$/,
  use  : extractLess.extract({ use : [ { loader : 'css-loader' }, { loader : 'less-loader' } ] }),
}

const rules = [
  typescriptRule,
  cssRule,
  lessRule,
]

const devtool =  'nosources-source-map'

const output = {
  filename: '[name].[chunkhash].js',
  path: path.resolve(__dirname, 'dist')
}

module.exports = {
  entry   : entry,
  output  : output,
  plugins : plugins,
  resolve : {
    extensions : [ '.ts', '.tsx', '.js' ],
  },
  devtool: devtool,
  module : { rules : rules },
}
