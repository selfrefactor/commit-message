process.on('unhandledRejection', console.log)
process.on('uncaughtException', console.log)

const depFn = require('dep-fn')
const { drop } = require('rambdax')

const { bump } = require('./services/bump/bump')
const { clone } = require('./services/clone/clone')
const { niketa } = require('./services/niketa/niketa')
const { copyToClipboard } = require('./services/c/copyToClipboard')
const { deploy } = require('./services/de/deploy')
const { fastDeploy } = require('./services/d/fastDeploy')
const { lintFile } = require('./services/lintFile/lintFile')
const { lintFolder } = require('./services/lintFolder/lintFolder')
const { log } = require('helpers-fn')
const { read } = require('./services/read/read')

async function runFn(){
  const [ firstArgumentRaw, secondArgument, thirdArgument, ...rest ] = drop(2)(process.argv)
  const firstArgument = firstArgumentRaw.toLowerCase()

  if ([ 'niketa', 'ni' ].includes(firstArgument)){
    return niketa()
  }
  if ([ 'lintfolder', 'lint', 'l' ].includes(firstArgument)){
    return lintFolder({ fastFlag : false })
  }

  if ([ 'lintfast', 'lintx', 'lx' ].includes(firstArgument)){
    return lintFolder({ fastFlag : true })
  }

  if ([ 'lintfile', 'lf' ].includes(firstArgument)){
    return lintFile(secondArgument)
  }

  if (firstArgument === 'bump'){
    return bump(secondArgument)
  }

  if (firstArgument === 'dep'){
    return depFn.cli()
  }

  if (firstArgument === 'de'){
    return deploy()
  }

  if (firstArgument === 'c'){
    return copyToClipboard(secondArgument)
  }

  if (firstArgument === 'clone'){
    return clone(secondArgument)
  }

  if (firstArgument === 'read'){
    return read(secondArgument, thirdArgument)
  }

  if (firstArgument === 'd'){
    return fastDeploy(...[ secondArgument, thirdArgument, ...rest ])
  }

  log('Such method does not exist', 'error')
}

runFn().then(() => {
  console.log('')
})
