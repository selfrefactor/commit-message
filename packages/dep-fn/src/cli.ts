import { log } from 'helpers'
import { add } from './add'
import { init } from './init'
import { special } from './special'
import { update } from './update'

process.on('unhandledRejection', (reason, promise) => {
  console.log(reason, promise)
})
process.on('uncaughtException', err => {
  console.log(err)
})

const input: string = process.argv[2]

let method: () => Promise<void>

switch (input) {
  case 'add':
    method = add
    break
  case 'init':
    method = init
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
    log('You didn\'t provide a valid method', 'error')
    process.exit()
}

method()
  .then(() => {
    console.log('done')
  })
  .catch(console.log)
