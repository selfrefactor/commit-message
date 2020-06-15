const { execCommand } = require('../../modules/execCommand')
const { maybe, head, last } = require('rambdax')

function parse(input){
  if (input.length === 2 && !head(input)) return [ 'chore@dnd' ]

  return maybe(
    head(input).endsWith(':') || head(input).includes('@'),
    input,
    input.length === 1 ?
      [ `feat@${ head(input) }` ] :
      input.length === 2 ?
        [ `feat@${ head(input) }`, last(input) ] :
        [ 'feat:', ...input ]
  )
}

async function fastDeploy(...inputArgumentsRaw){
  const inputArguments = parse(inputArgumentsRaw)

  const commitMessage = inputArguments.join(' ').trim()
  await execCommand('git add . --all')
  await execCommand(`git commit -m "${ commitMessage }"`)
  await execCommand('git push')

  console.log(`Pushed with message '${ commitMessage }'`)
}

exports.fastDeploy = fastDeploy