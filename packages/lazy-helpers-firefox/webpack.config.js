// process.env.NODE_ENV = 'production'

const entry = './src/lazy-helpers.js'

const output = {
  filename : 'bundle.js',
  path     : __dirname + '/dist',
}

const fileRule = {
  test    : /\.jsx?$/,
  loader  : 'babel-loader',
  include : `${ __dirname }/src`,
}

module.exports = {
  mode    : 'production',
  entry,
  output,
  resolve : { extensions : [ '.js' ] },
  module  : { rules: [ fileRule ] },
}
