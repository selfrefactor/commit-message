import {log} from 'helpers-fn'
import {update} from './update'

export async function cli(): Promise<void> {
  const input: string = process.argv[3]
  const target: string = process.argv[4]
  const lastArgument: string = process.argv[5]
  let method: (x?: any, y?: any) => any

  switch (input) {
    case 'update':
      method = update
      break
    case 'updateall':
      process.env.DEP_FN_UPDATE_ALL = 'true'
      method = update
      break
    default:
      log('Default method is "updateall"', 'info')
      process.env.DEP_FN_UPDATE_ALL = 'true'
      method = update
  }

  await method(target, lastArgument)

  return console.log('done')
}
