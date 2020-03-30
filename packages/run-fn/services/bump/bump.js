const { execCommand } = require('../../modules/execCommand')

async function bump(version = 'patch'){
  await execCommand(`npm version ${ version }`)
  await execCommand('npm publish')
  await execCommand(`run d chore@bump ${ version }`)
}

exports.bump = bump
