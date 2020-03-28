require('env')('special')
const webpack = require('webpack')

process.env.NODE_ENV = 'production'

const envToPass = [
  'LAZY_HELPERS',
  'NODE_ENV',
]

const plugins = [
  new webpack.EnvironmentPlugin(envToPass),
]

const entry = {
  bundle: './src/index.jsx',
  background: './src/background.js',
}

const output = {
  filename : '[name].js',
  path     : __dirname + '/lazy_helpers',
}

const fileRule = {
  test    : /\.jsx?$/,
  loader  : "babel-loader",
  include : `${ __dirname }/src`,
}

const cssRule = {
  test : /\.css$/,
  use  : [ 'style-loader', 'css-loader' ],
}

const rules = [
  fileRule,
  cssRule
]

module.exports = {
  mode: 'production',
  entry,
  output,
  plugins,
  resolve : { 
    extensions : [ '.js', '.jsx' ] 
  },
  module  : { rules },
}
