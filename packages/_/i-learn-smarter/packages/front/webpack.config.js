process.env.NODE_ENV = 'development'

const { 
  cssRule,
  devEntry, 
  devHtml,
  devServer,
  devTypescriptRule,
  envs, 
  error,
  hot, 
  resolve,
  sourceMapRule,
} =  require('./files/webpackConfigs')

const plugins = [
  hot,
  error,
  devHtml,
  envs,
]

const output = {
  filename : 'bundle.js',
  path     : `${__dirname}/dev_dist`,
}

const rules = [
  devTypescriptRule,
  sourceMapRule,
  cssRule,
]

const mode = 'development'

const devtool = 'eval'

module.exports = {
  entry: devEntry,
  stats: 'errors-only',
  mode,
  devtool,
  output,
  devServer,
  plugins,
  resolve,
  module  : { rules },
}
