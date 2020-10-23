import babel from '@rollup/plugin-babel';
import cleanup from 'rollup-plugin-cleanup'
import replace from '@rollup/plugin-replace'
import {nodeResolve}  from '@rollup/plugin-node-resolve'

const extensions = [ '.js' ]

export default {
  plugins : [
    replace({ 'process.env.NODE_ENV' : JSON.stringify('production') }),
    nodeResolve({
      extensions,
      browser: false,
      preferBuiltins : true,
    }),
    cleanup(),
    babel({ 
      babelHelpers: 'bundled',
        extensions,
        exclude : [ 'node_modules/**' ],
    })
  ],
  input  : 'string-fn.js',
  output : [
    {
      file   : './dist/string-fn.js',
      format : 'cjs',
    },
    {
      file   : './dist/string-fn.esm.js',
      format : 'es',
    },
    {
      file   : './dist/string-fn.mjs',
      format : 'esm',
    },
  ],
}
