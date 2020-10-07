const { head, split, replace } = require('rambda')
const { readFileSync, existsSync } = require('fs')
const { resolve } = require('path')
const {getEnvPath } = require('./get-env-path')

const applyEnvFn = filePath => {
  const allEnv = readFileSync(filePath, 'utf8')
  const toReturn = []

  allEnv
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const key = head(split('=', line)).trim()
      const val = replace(
        `${ key }=`, '', line
      ).trim()

      process.env[ key ] = val
      toReturn.push(`${ key }=${ val }`)
    })
  console.log(`\u2713    Environment variables loaded from '${ filePath }'`)

  return toReturn.join(';')
}

const envFn = (mode = 'local', cwd = process.cwd()) => {
  if (process.env.ENV_FLAG === undefined){
    process.env.ENV_FLAG = 'true'
  } else {
    return
  }

  const initialFilePath = resolve(cwd, '.env')

  if (existsSync(initialFilePath) && mode === 'local'){
    return applyEnvFn(initialFilePath)
  }

  const filePath = getEnvPath(mode === 'special', cwd)

  if (filePath === undefined || existsSync(filePath) === false){
    throw new Error('Such env filepath does not exist !!!')
  }

  return applyEnvFn(filePath)
}

exports.envFn = envFn
