import { remove, maybe } from 'rambdax'
import { snakeCase } from 'string-fn'
import { existsSync, readdir } from 'fs'
import { getDirBee } from './init'

export function loadKeysBee(label, secondLabel){
  return new Promise(resolve => {
    const actualLabel = maybe(
      secondLabel === undefined,
      () => snakeCase(label, true),
      () => snakeCase(label, true) + '/' + snakeCase(secondLabel, true)
    )

    const dir = getDirBee() + '/' + actualLabel
    if (!existsSync(dir)) return resolve()

    readdir(dir, (_, dirData) => {
      const parsed = dirData.map(remove('.json'))
      resolve(parsed)
    })
  })
}
