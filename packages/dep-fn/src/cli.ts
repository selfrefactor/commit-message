import {log} from 'helpers-fn'
import {special} from './special'
import {update} from './update'

process.on('unhandledRejection', (reason, promise) => {
  console.log(reason, promise)
})
process.on('uncaughtException', err => {
  console.log(err)
})

export function cli() {
  const input: string = process.argv[3]
  let method: () => Promise<void>

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
    case 'updateall':
      process.env.DEP_FN_UPDATE_ALL = 'true'
      method = update
      break
    default:
      log('Default method is "updateall"', 'info')
      process.env.DEP_FN_UPDATE_ALL = 'true'
      method = update
  }

  method()
    .then(() => {
      console.log('done')
    })
    .catch(console.log)
}
