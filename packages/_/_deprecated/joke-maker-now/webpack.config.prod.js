require('env')('special')
process.env.NODE_ENV = 'production'

const path = require('path')
const webpack = require('webpack')
const {WebpackBundleSizeAnalyzerPlugin}= require('webpack-bundle-size-analyzer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const WebpackMonitor = require('webpack-monitor')

const uglifyOptions = {
  ecma: 8,
  compress: {
    inline: 1
  }
}

const uglify = new UglifyJSPlugin({ 
  sourceMap : false,
  uglifyOptions
})

const clean = new CleanWebpackPlugin(['dist'])
const report = new WebpackBundleSizeAnalyzerPlugin('./plain-report.txt')

const monitor = new WebpackMonitor({
  capture: true,
  launch: true,
})
const env = new webpack.EnvironmentPlugin([
  'NODE_ENV',
  'NGROK_URL',
])

const ids = new webpack.HashedModuleIdsPlugin()
const html = new HtmlWebpackPlugin({
  title             : 'DEV',
  xhtml             : true,
  alwaysWriteToDisk : true,
  favicon           : './files/favicon.ico',
})

const plugins = [
  clean,
  env,
  ids,
  // report,
  // monitor,
  html,
  uglify,
]

const entry = {
  main   : './src/index.tsx',
}

const tsxLoader = 'awesome-typescript-loader'

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

const rules = [
  typescriptRule,
  cssRule,
]

const output = {
  filename: '[name].[chunkhash].js',
  path: path.resolve(__dirname, 'dist')
}

const devtool =  'nosources-source-map'
const target = 'web'

const resolve = {
  extensions: [ 
    '.ts', 
    '.tsx', 
    '.js'
  ]
}
const splitChunks = {
  name: 'common',
  chunks: 'all'
}
const optimization = {
  splitChunks, 
  runtimeChunk: true,
  concatenateModules: true,
  namedModules: true
}

const mode = 'development'

module.exports = {
  devtool,
  entry,
  mode,
  module  : { rules },
  optimization,
  output,
  plugins,
  resolve,
  target,
}
