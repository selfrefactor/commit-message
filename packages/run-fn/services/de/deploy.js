const { commitAndPush } = require('commit-fn')

async function deploy(){
  process.env.PACKAGE_STORAGE = 'true'

  return commitAndPush(process.cwd())
}

exports.deploy = deploy
