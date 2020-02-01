require('env')('special')
const webpack = require('webpack')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const { idHolder } = require('./_helpers/idHolder.js')

// PRODUCTION
/////////////////
exports.clean = new CleanWebpackPlugin([ 'dist' ])

const uglifyOptions = {
  ecma     : 8,
  compress : { inline : 1 },
}

exports.uglify = new UglifyJSPlugin({
  sourceMap : false,
  uglifyOptions,
})

exports.ids = new webpack.HashedModuleIdsPlugin()

const paths = [ '/', ...idHolder ]

exports.html = new HtmlWebpackPlugin({
  title             : 'I Learn Smarter',
  xhtml             : true,
  alwaysWriteToDisk : true,
  favicon           : './files/favicon.ico',
})

const prodTsxLoader = 'awesome-typescript-loader'
exports.prodTypescriptRule = {
  exclude : [ /node_modules\/(?!(notify)\/).*/ ],
  include : [
    `${ process.cwd() }/src`,
    `${ process.cwd() }/notify`,
  ],
  loader : prodTsxLoader,
  test   : /\.tsx?$/,
}

const splitChunks = {
  name   : 'common',
  chunks : 'all',
}
exports.optimization = {
  splitChunks,
  runtimeChunk       : true,
  concatenateModules : true,
  namedModules       : true,
}
// DEVELOPMENT
/////////////////
exports.devServer = {
  contentBase        : './dev_dist',
  disableHostCheck   : true,
  stats              : 'errors-only',
  host               : 'localhost',
  historyApiFallback : true,
  // Quiet             : true,
  headers            : { 'Access-Control-Allow-Origin' : '*' },
  hot                : true,
  port               : 8080,
  watchOptions       : { poll : 30 },
}

exports.devEntry = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  './src/index.tsx',
]

exports.hot = new webpack.HotModuleReplacementPlugin()

const devTsxLoader =
  'awesome-typescript-loader?useBabel=true&useCache=true'
const devUse = [ { loader : 'cache-loader' }, devTsxLoader ]

exports.devTypescriptRule = {
  test    : /\.tsx?$/,
  use     : devUse,
  include : [
    `${ process.cwd() }/src`,
    `${ process.cwd() }/notify`,
  ],
  exclude : [ /node_modules\/(?!(notify)\/).*/ ],
}

exports.sourceMapRule = {
  enforce : 'pre',
  test    : /\.js$/,
  loader  : 'source-map-loader',
}

exports.devHtml = new HtmlWebpackPlugin({
  title             : 'I Learn Smarter',
  alwaysWriteToDisk : true,
  favicon           : './files/favicon.ico',
})

exports.error = new FriendlyErrorsWebpackPlugin()
// COMMON
/////////////////
exports.resolve = { extensions : [ '.ts', '.tsx', '.js' ] }

exports.envs = new webpack.EnvironmentPlugin([
  'NODE_ENV',
  'COUCH_URL',
  'NGROK_URL',
])

exports.cssRule = {
  test : /\.css$/,
  use  : [ 'style-loader', 'css-loader' ],
}
