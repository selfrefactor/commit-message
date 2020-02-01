module.exports = api => {
  const env = api.env()

  const envOpts = { modules : false }

  const runtimeOps = {
    corejs       : 2,
    helpers      : true,
    regenerator  : true,
    useESModules : true,
  }

  const presets = [
    [ '@babel/preset-env', envOpts ],
    '@babel/preset-react',
  ]

  const plugins = [
    [ '@babel/plugin-transform-runtime', runtimeOps ],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-do-expressions',
  ]

  if (env === 'test'){
    envOpts.modules = 'commonjs'
    runtimeOps.useESModules = false
    plugins.push([
      'babel-plugin-css-modules-transform',
      { generateScopedName : '[name]-[local]' },
    ])
  }

  return {
    presets,
    plugins,
  }
}
