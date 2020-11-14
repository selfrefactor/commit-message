const { execCommand } = require('../../modules/execCommand')
const { existsSync } = require('fs')
const { log } = require('helpers-fn')
const { CWD } = require('../../constants')

async function angular(repo){
  console.log({CWD})
  /*
  await execCommand(`git angular git@github.com:selfrefactor/${ repo }.git`)
  const maybePackageJson = `${ process.cwd() }/${ repo }/package.json`
  if (!existsSync(maybePackageJson)){
    return log('No package json found, will skip install process', 'info')
  }
  const maybePackageLock = `${ process.cwd() }/${ repo }/package-lock.json`
  const dependencyInstaller = existsSync(maybePackageLock) ? 'npm' : 'yarn'
  await execCommand(`${ dependencyInstaller } install`,
  `${ process.cwd() }/${ repo }`)
    
  */
}

exports.angular = angular
