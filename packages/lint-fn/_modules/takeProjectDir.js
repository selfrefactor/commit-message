const { existsSync } = require('fs')
const { allTrue, dropLast } = require('rambdax')

function takeProjectDir(filePath){
  let willReturn

  [1,2,3,4,5,6].forEach(i => {
    if(willReturn=== undefined){
      const list = filePath.split('/')
      const maybeDir = dropLast(i, list).join('/')

      if(existsSync(`${maybeDir}/package.json`)){
        const ok = allTrue(
          existsSync(`${maybeDir}/tslint.json`),
          existsSync(`${maybeDir}/tsconfig.json`),
        )

        willReturn = ok ? maybeDir : false
      }

    }
  })

  return willReturn
}

exports.takeProjectDir = takeProjectDir