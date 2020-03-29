const { dropLast, range } = require('rambdax')
const { existsSync } = require('fs')

function takeProjectDir(filePath){
  let willReturn
  const loop = range(1, 10)

  loop.forEach(i => {
    // needed as even package.json is found 
    // that could be Angular library 
    // and we need to keep waiting for
    // project root directory
    // ============================================
    if (!willReturn){
      const list = filePath.split('/')
      const maybeDir = dropLast(i, list).join('/')

      if (existsSync(`${ maybeDir }/package.json`)){
        willReturn = existsSync(`${ maybeDir }/tsconfig.json`) ?
          maybeDir :
          false
      }
    }
  })

  if (!willReturn){
    return {
      ok         : false,
      eslintFlag : false,
      path       : '',
    }
  }

  return {
    ok         : true,
    path       : willReturn,
    eslintFlag : existsSync(`${ willReturn }/.eslintrc.js`),
  }
}

exports.takeProjectDir = takeProjectDir
