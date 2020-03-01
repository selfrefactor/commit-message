const {readFileSync, existsSync} = require('fs')
const {resolve} = require('path')
const {head, split, replace} = require('rambda')
const SPECIAL_MODE = 'special'
const DIR_MODE = 'dirname'
const LEVELS_SPECIAL = 4
const LEVELS = 10

const getSpecialEnvPath = (dirFlag) => {
  let flag = true
  let willReturn

  const basePath = dirFlag ?
    __dirname : 
    process.cwd()

  Array(LEVELS_SPECIAL).fill('')
    .map((_, i) => {
      if (flag) {
        const filePath = resolve(basePath, `${ '../'.repeat(i) }/envs/.env`)

        if (existsSync(filePath)) {
          flag = false
          willReturn = filePath
        }
      }
    })

  return willReturn
}

const getEnvPath = fileName => {
  let flag = true
  let willReturn

  Array(LEVELS).fill('')
    .map((_, i) => {
      if (flag) {
        const filePath = resolve(process.cwd(), `${ '../'.repeat(i) }${ fileName }`)

        if (existsSync(filePath)) {
          flag = false
          willReturn = filePath
        }
      }
    })

  return willReturn
}

const helper = filePath => {
  const allEnv = readFileSync(filePath, 'utf8')
  allEnv.split('\n').filter(Boolean).map(line => {
    const key = head(split('=', line)).trim()
    const val = replace(
      `${ key }=`,
      '',
      line
    ).trim()
    process.env[ key ] = val
  })
  console.log(`\u2713    Environment variables loaded from '${ filePath }'`)
}

const envFn = (fileName = '.env') => {
  if (process.env.ENV_FLAG === undefined) {
    process.env.ENV_FLAG = 'true'
  } else {
    return
  }

  const initFilePath = resolve(process.cwd(), fileName)

  if (existsSync(initFilePath)) {
    helper(initFilePath)

    return
  }

  const condition = fileName === SPECIAL_MODE || fileName === DIR_MODE

  const filePath = condition ?
    getSpecialEnvPath(fileName === DIR_MODE) :
    getEnvPath(fileName)

  if (filePath === undefined || existsSync(filePath) === false) {
    console.log('Such env filepath does not exist !!!')

    return
  }

  helper(filePath)
}

exports.envFn = envFn