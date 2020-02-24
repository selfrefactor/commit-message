import { readFile, existsSync } from 'fs'
import { snakeCase } from 'string-fn'
import { getDirBee } from './init'

export function loadJsonBee(label, secondLabel){
  const base = `${ getDirBee() }/${ snakeCase(label, true) }`

  return new Promise(resolve => {
    const path = secondLabel ?
      `${ base }/${ snakeCase(secondLabel, true) }.json` :
      `${ base }.json`

    if (!existsSync(path)) return resolve()

    readFile(
      path,
      (_, data) => {
        if (!data) return resolve()

        try {
          const parsed = JSON.parse(data.toString())

          resolve(parsed)
        } catch (error){
          console.log(
            error,
            data.toString(),
            label,
            secondLabel,
            'sk'
          )
          resolve()
        }
      }
    )
  })
}
