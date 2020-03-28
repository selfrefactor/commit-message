const defaultOptions = require('./modules/defaultOptions')
const execFileCommand = require('./modules/execFileCommand')
const R = require('rambda')
const sane = require('sane')
const { log } = require('helpers-fn')

async function helper({ filePath, commands, options }){
  try {
    const willReturn = []

    for (const singleCommand of commands){
      let holder

      if (R.type(singleCommand) === 'String'){
        const command = R.replace(
          /filepath/g, filePath, singleCommand
        )

        holder = await execFileCommand(command, options.cwd)
      } else if (typeof singleCommand === 'function'){
        if (singleCommand.toString().startsWith('async')){
          holder = await singleCommand(filePath)
        } else {
          holder = singleCommand(filePath)
        }
      }
      willReturn.push(holder)
    }

    return willReturn
  } catch (err){
    throw err
  }
}

async function main({ filePath, commands, options }){
  try {
    let willReturn

    if (R.type(commands) === 'String'){
      const command = R.replace(
        /filepath/g, filePath, commands
      )

      willReturn = await execFileCommand(command, options.cwd)
    } else if (R.type(commands) === 'Array'){
      willReturn = await helper({
        filePath,
        commands,
        options,
      })
    } else if (typeof commands === 'function'){
      if (commands.toString().startsWith('async')){
        willReturn = await commands(filePath)
      } else {
        willReturn = commands(filePath)
      }
    }

    return willReturn
  } catch (err){
    throw err
  }
}

function start(inputOptions = {}){
  return new Promise(resolve => {
    const options = Object.assign(
      {}, defaultOptions, inputOptions
    )
    const globsArr = Object.keys(options.commands).map(x => `**/*.${ x }`)

    const watcher = sane(options.directory,
      Object.assign(options.sane, { glob : globsArr }))

    const filterFn = filePath =>
      R.any(x => filePath.includes(x), options.negativeMatches)

    watcher.on('ready', () => {
      log(`watching ${ options.directory } has started`, 'info')
    })

    watcher.on('delete', filePath => {
      const fullFilePath = `${ options.directory }/${ filePath }`

      options.onDelete(fullFilePath)
    })

    let mainFlag = true

    watcher.on('change', filePath => {
      const fullFilePath = `${ options.directory }/${ filePath }`

      if (process.env.NODE_ENV === 'test'){
        console.log(fullFilePath)
      }

      let flag = false
      let commands

      Object.keys(options.commands).map(x => {
        if (filePath.endsWith(`.${ x }`)){
          flag = true
          commands = options.commands[ x ]
        }
      })

      if (!filterFn(filePath) && mainFlag === true && flag === true){
        mainFlag = false
        log(fullFilePath, 'info')

        main({
          filePath : fullFilePath,
          commands : commands,
          options  : options,
        })
          .then(result => {
            options.logFn(result)
          })
          .catch(err => {
            console.log(err)
            if (options.exitFlag){
              watcher.close()
              resolve(err)
            }
          })

        setTimeout(() => {
          mainFlag = true
        }, options.timeout)
      }
    })
  })
}

module.exports.start = start
