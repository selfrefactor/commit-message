const { execCommand } = require('../../modules/execCommand')

async function install(repo){
  await execCommand(
    `git clone git@github.com:selfrefactor/${ repo }.git`,
    process.cwd(),
    true
  )
  await execCommand(
    `cd ${ repo }&&rm -rf .git`, process.cwd(), true
  )
}

exports.install = install
