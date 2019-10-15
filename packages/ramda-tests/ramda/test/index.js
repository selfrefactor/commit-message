const eq = require('./shared/eq')
const fs = require('fs')
const path = require('path')
const R = require('../../../../../rambda/dist/rambda')

function sourceMethods(dir){
  const isJsFile = function(file){ return file.match(/\.js$/) }
  const isIndex = R.equals('index.js')
  const removeJsEnding = function(file){ return file.replace('.js', '') }

  return fs.readdirSync(dir).filter(R.both(R.complement(isIndex), isJsFile))
    .map(removeJsEnding)
}

/**
 * Convention is
 *  * Actual API—all `./es/*.js` files are top level API methods
 *  * Exported API—object in `./es/index.js` to be exported
 *  * Actual and exported APIs should be the same
 *
 * Two cases, when exported and actual APIs might differ
 *  1. newly added API `./es/method.js` is forgotten to be added into './es/index.js'
 *  2. API method is deprecated and actual source file from `./es/` removed,
 *     while continues to exist in `./es/index.js`
 *
 * 1st case is detected in first assertion, and detailed in second one
 *
 * 2st case doesnt need detection, because NodeJS will throw an error
 * if you would attempt to require non existing file
 */
describe('API surface', () => {
  if (typeof require.resolve !== 'function'){
    return
  }
  const exported = Object.keys(R).filter(key => key !== '__esModule')
  const actual = sourceMethods(path.dirname(require.resolve('../source')))

  it('both APIs are in sync', () => {
    eq(actual.length, exported.length)
  })

  it('list of not exported API methods is empty', () => {
    function isNotExported(method){ return exported.indexOf(method) === -1 }
    eq(actual.filter(isNotExported), [])
  })
})
