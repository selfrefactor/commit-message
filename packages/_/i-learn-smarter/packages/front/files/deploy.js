const { remove } = require('rambdax')
const { exec, log } = require('helpers')

const alias = 'i-learn-smarter'

async function deploy() {
  const cwd = process.cwd()
  await exec({
    cwd,
    command: 'yarn maid out'
  })
  const logs = await exec({
    cwd,
    command: 'yarn now'
  })
  const [addressRaw] = logs.filter(x => x.startsWith('http'))
  if(!addressRaw) return console.log('error')
  const address = remove('https://',addressRaw)
  const nowCommand = `now alias ${address} ${alias}`
  log(nowCommand, 'back')
  await exec({
    cwd,
    command: nowCommand
  })
}

deploy()