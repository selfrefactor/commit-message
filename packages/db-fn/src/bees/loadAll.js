import { remove } from 'rambdax'
import { snakeCase } from 'string-fn'
import { existsSync, readdir } from 'fs'
import { getDirBee } from './init'
import { loadJsonBee } from './loadJson'

export function loadAllBee(label){
  return new Promise(resolve => {
    const dir = `${ getDirBee() }/${ snakeCase(label, true) }`

    if (!existsSync(dir)) return resolve()

    readdir(dir, (_, dirData) => {
      const promised = dirData.map(
        x => loadJsonBee(label, remove('.json', x))
      )
      Promise.all(promised)
        .then(resolve)
    })
  })
}
