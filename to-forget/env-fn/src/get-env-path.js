const { existsSync } = require('fs')
const { resolve } = require('path')
const LEVELS = 10

const getEnvPath = (isSpecial, cwd) => {
  const end = isSpecial ? '/envs/.env' : '.env'

  let flag = true
  let willReturn

  Array(LEVELS)
    .fill('')
    .map((_, i) => {
      if (flag){
        const filePath = resolve(cwd, `${ '../'.repeat(i) }${ end }`)

        if (existsSync(filePath)){
          flag = false
          willReturn = filePath
        }
      }
    })

  return willReturn
}

exports.getEnvPath= getEnvPath