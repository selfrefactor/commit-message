require('env')('special')

const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'production'
process.env.PROD = 'true'

const envToPass = [
  'COUCH_URL',
  'CONTEXT',
  'NODE_ENV',
  'SERVICE_UPLOAD_IMAGE',
]

const clean = new CleanWebpackPlugin([ 'dist' ])
const env = new webpack.EnvironmentPlugin(envToPass)
const merge = new webpack.optimize.AggressiveMergingPlugin()

const ids = new webpack.HashedModuleIdsPlugin()
const chunks = new webpack.optimize.CommonsChunkPlugin({ 
  names : ['vendor', 'runtime'] 
})

const html = new HtmlWebpackPlugin({
  title             : 'Admin Panel',
  alwaysWriteToDisk : true,
  template          : './files/template.html',
  favicon           : './files/favicon.ico',
})

const plugins = [
  clean,
  env,
  chunks,
  merge,
  ids,
  html,
]

const vendors = [
  'connected-react-router',
  'history',
  'rambdax',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
]

const entry = {
  main   : './src/index.tsx',
  vendor : vendors,
}

const tsxLoader = 'awesome-typescript-loader'

const typescriptRule = {
  exclude : [ /node_modules\/(?!(notify)\/).*/ ],
  include : [ `${ __dirname }/src`, `${ __dirname }/node_modules/notify/` ],
  loader  : tsxLoader,
  test    : /\.tsx?$/,
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
  cssRule,
  lessRule,
  typescriptRule,
]

const devtool = 'nosources-source-map'

const output = {
  filename : '[name].[chunkhash].js',
  path     : path.resolve(__dirname, 'dist'),
}

const target = 'web'

const resolve = {
  extensions: [ 
    '.ts', 
    '.tsx', 
    '.js'
  ]
}

module.exports = {
  devtool,
  entry,
  module  : { rules },
  output,
  plugins,
  resolve,
  target,
}
