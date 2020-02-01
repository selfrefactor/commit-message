require('env')('special')
process.env.NODE_ENV = 'development'

const AutoDllPlugin = require('autodll-webpack-plugin').default
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const cacheHelper = new HardSourceWebpackPlugin()
const named = new webpack.NamedModulesPlugin()
const envs = new webpack.EnvironmentPlugin([
  'COUCH_URL',
  'NODE_ENV',
  'CONTEXT',
  'SERVICE_UPLOAD_IMAGE',
])
const html = new HtmlWebpackPlugin({
  title             : 'DEV',
  alwaysWriteToDisk : true,
  inject            : true,
  template          : './files/template.html',
  favicon           : './files/favicon.ico',
})
const dll = new AutoDllPlugin({
  inject: true,
  filename: '[name]_[hash].js',
  entry: {
    vendor: [
      "connected-react-router",
      "history",
      "rambdax",
      "react-dom",
      "react-redux",
      "react-router",
      "react",
      "redux-saga",
      "redux"
    ]
  }
})
const htmlHard = new HtmlWebpackHarddiskPlugin()
const hot = new webpack.HotModuleReplacementPlugin()

const plugins = [
  cacheHelper,
  named,
  envs,
  html,
  dll,
  htmlHard,
  hot
]

const devServer = {
  contentBase      : './dev_dist',
  disableHostCheck : true,
  historyApiFallback: true,
  host: 'localhost',
  port: 8080,
  headers          : { 'Access-Control-Allow-Origin' : '*' },
  hot              : true,
  watchOptions     : { poll : 30 },
}

const entry = [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  './src/index.tsx',
]

const output = {
  filename : 'bundle.js',
  path     : __dirname + '/dev_dist',
}

const awesomeOptions = [
  'useBabel',
  'useCache',
].map(
  x => `${x}=true`
).join('&')

const tsxLoader = [
  'react-hot-loader/webpack',
  `awesome-typescript-loader?${awesomeOptions}`,
]

const typescriptRule = {
  test    : /\.tsx?$/,
  loader  : tsxLoader,
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

const lessRule = {
  test : /\.less$/,
  use  : [ 
    { loader : 'style-loader' }, 
    { loader : 'css-loader' }, 
    { loader : 'less-loader' } 
  ],
}

const rules = [
  typescriptRule,
  sourceMapRule,
  cssRule,
  lessRule,
]
const devtool = 'eval'

module.exports = {
  entry,
  output,
  plugins,
  devServer,
  devtool,
  resolve : { extensions : [ '.ts', '.tsx', '.js' ] },
  module  : { rules},
}
