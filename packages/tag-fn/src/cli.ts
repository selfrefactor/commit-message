import * as inquirer from 'inquirer'
import {log} from 'helpers'
import {drop} from 'rambdax'
import {tagFn} from './index'
import {init} from './modules/init'
const [input]  = drop(3, process.argv)

export function cli(){
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
}
