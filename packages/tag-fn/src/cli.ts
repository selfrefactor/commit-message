process.on('unhandledRejection', (reason, promise) => {
  console.log(reason, promise)
})
process.on('uncaughtException', err => {
  console.log(err)
})

import * as inquirer from 'inquirer'
import {log} from 'helpers'
import {drop} from 'rambdax'
import {tagFn} from './index'
import {init} from './modules/init'

const [input]: Array<string> = drop(2, process.argv)

if (input === 'init') {

  inquirer
    .prompt([
      { type: 'input', message: 'Your Github username?', name: 'user' },
      { type: 'password', message: 'Your Github password?', name: 'password' },
    ])
    .then((credentials: ICredentials) => {
      init(credentials)
    })

}else {
  const tag = input === undefined ?
    'minor' :
    input

  if (['minor', 'major', 'patch'].includes(tag)){
    log(`${tag} incrementation of the latest tag will be applied\n`, 'info')
  }else{
    log(`The new tag will be '${tag}'\n`, 'info')
  }

  log('spin')
  tagFn({tag})
  .then(() => {
    log('stopspin')
  })
  .catch(console.log)

}
