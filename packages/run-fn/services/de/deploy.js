const { commitAndPush } = require('commit-fn')
const { defaultTo } = require('rambdax')
const { exec } = require('child_process')
const { existsSync } = require('fs')
const { log } = require('helpers-fn')
const { parseTestOutput } = require('./parseTestOutput.js')
const { readJsonSync } = require('fs-extra')

const execJest = ({ cwd, command }) =>
  new Promise((resolve, reject) => {
    const proc = exec(command, { cwd })

    proc.stdout.on('data', chunk => {
      const testOutput = chunk.toString()
      if (!testOutput.includes('numFailedTests')) return {}

      try {
        const parsed = JSON.parse(testOutput)
        resolve(parsed)
      } catch (e){
        return resolve(parseTestOutput(testOutput))
      }
    })
    proc.stdout.on('error', reject)
    proc.stdout.on('end', () => resolve({}))
  })

async function checkForProveScript(){
  const dir = defaultTo(process.cwd(), process.env.RUN_FN_CWD)
  const okPackageJson = existsSync(`${ dir }/package.json`)
  if (!okPackageJson) return

  const { scripts } = readJsonSync(`${ dir }/package.json`)
  if (!scripts) return
  if (!scripts.prove) return
  if (!scripts.prove.includes(' --json')){
    return log('"Prove" script must include "--json"', 'warning')
  }
  log('Prove test starts', 'box')

  const { numFailedTests } = await execJest({
    command : 'yarn prove',
    cwd     : dir,
  })
  if (!numFailedTests) return

  if (numFailedTests > 0){
    throw new Error(`Failed ${ numFailedTests } tests`)
  }

  log('Prove test is passing', 'success')
}

async function deploy(skipProveRun){
  try {
    process.env.PACKAGE_STORAGE = 'true'
    if (skipProveRun !== undefined){
      return commitAndPush(process.cwd())
    }
    await checkForProveScript()

    return commitAndPush(process.cwd())
  } catch (error){
    log('Cannot proceed further with commit', 'info')
    log(error, 'error')
  }
}

exports.deploy = deploy
