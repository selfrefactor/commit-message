require('env')('special')
process.env.NODE_ENV = 'development'
const PORT = 5000

const Jarvis = require('webpack-jarvis')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const monitor = new Jarvis()
const env = new webpack.EnvironmentPlugin([
  'NODE_ENV',
  'NGROK_URL',
])

const hot = new webpack.HotModuleReplacementPlugin()
const html = new HtmlWebpackPlugin({
  title             : 'DEV',
  xhtml             : true,
  alwaysWriteToDisk : true,
  favicon           : './files/favicon.ico',
})

const plugins = [
  hot,
  env,
  html,
  // monitor,
]

const devServer = {
  contentBase       : './dev_dist',
  disableHostCheck  : true,
  host              :'localhost',
  historyApiFallback: true,
  headers           : { 'Access-Control-Allow-Origin' : '*' },
  hot               : true,
  port              : PORT,
}

const entry = [
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://localhost:${PORT}`,
  'webpack/hot/only-dev-server',
  './src/index.tsx',
]

const output = {
  filename : 'bundle.js',
  path     :  `${__dirname}/dev_dist`,
}

const tsxLoader = 'awesome-typescript-loader?useBabel=true&useCache=true'
const use = [
  { loader: 'cache-loader' },
  tsxLoader
]
const typescriptRule = {
  test    : /\.tsx?$/,
  use,
  include : [ `${ __dirname }/src`, `${ __dirname }/node_modules/notify/` ],
  exclude : [ /node_modules\/(?!(notify)\/).*/ ],
}
const sourceMapRule = {
  enforce : 'pre',
  test    : /\.js$/,
  loader  : 'source-map-loader',
}
const cssRule = {
  test : /\.css$/,
  use  : [ 'style-loader', 'css-loader' ],
}

const rules = [
  typescriptRule,
  sourceMapRule,
  cssRule,
]

const devtool = "eval"

const resolve = { extensions : [ '.ts', '.tsx', '.js' ] }
const mode = 'development'

module.exports = {
  entry,
  mode,
  devtool,
  output,
  devServer,
  plugins,
  resolve,
  module  : { rules },
}
