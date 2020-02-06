import * as inquirer from 'inquirer'
import {init} from '../modules/init'

export async function setCredentials(){
  const credentials: ICredentials = await inquirer
    .prompt([
      { type: 'input', message: 'Your Github username?', name: 'user' },
      { type: 'password', message: 'Your Github password?', name: 'password' },
    ])
  
  return init(credentials)
}