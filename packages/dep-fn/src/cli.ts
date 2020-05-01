import {log} from 'helpers-fn'
import {special} from './special'
import {update} from './update'
import {renovate} from './renovate'

process.on('unhandledRejection', (reason, promise) => {
  console.log(reason, promise)
})
process.on('uncaughtException', err => {
  console.log(err)
})

export async function cli(): Promise<void> {
  const input: string = process.argv[3]
  const target: string = process.argv[4]
  let method: (x?: any) => any

  switch (input) {
    case 'add':
      method = special
      break
    case 'special':
      method = special
      break
    case 'update':
      method = update
      break
    case 'target':
      method = renovate
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

  await method(target)

  return console.log('done')
}
