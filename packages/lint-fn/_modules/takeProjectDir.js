const { dropLast } = require('rambdax')
const { existsSync } = require('fs')

function takeProjectDir(filePath){
  let willReturn
  ;[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].forEach(i => {
    if (willReturn === undefined){
      const list = filePath.split('/')
      const maybeDir = dropLast(i, list).join('/')

      if (existsSync(`${ maybeDir }/package.json`)){
        willReturn = existsSync(`${ maybeDir }/tsconfig.json`) ? maybeDir : false
      }
    }
  })

  if (willReturn === undefined)
    return {
      ok         : false,
      eslintFlag : false,
      path       : '',
    }

  if (!willReturn){
    return {
      eslintFlag : false,
      ok         : existsSync(`${ willReturn }/tslint.json`),
      path       : willReturn,
    }
  }

  return {
    ok         : existsSync(`${ willReturn }/.eslintrc.js`),
    path       : willReturn,
    eslintFlag : true,
  }
}

exports.takeProjectDir = takeProjectDir
