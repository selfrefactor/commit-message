const { envFn } = require('env-fn')
envFn('special')
const webpack = require('webpack')

process.env.NODE_ENV = 'production'

const envToPass = [
  'API_ACCESS_TOKEN',
  'NGROK_URL',
  'NODE_ENV',
  'ZAPIER_BUFFER_URL',
]

const plugins = [ new webpack.EnvironmentPlugin(envToPass) ]

const entry = './src/index.jsx'

const output = {
  filename : 'bundle.js',
  path     : __dirname + '/chrome_dist',
}

const fileRule = {
  test    : /\.jsx?$/,
  loader  : 'babel-loader',
  include : `${ __dirname }/src`,
}

const cssRule = {
  test : /\.css$/,
  use  : [ 'style-loader', 'css-loader' ],
}

const rules = [ fileRule, cssRule ]

module.exports = {
  mode    : 'production',
  entry,
  output,
  plugins,
  resolve : { extensions : [ '.js', '.jsx' ] },
  module  : { rules },
}
