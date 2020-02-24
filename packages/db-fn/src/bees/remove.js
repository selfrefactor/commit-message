import { glue } from 'rambdax'
import { existsSync, unlinkSync } from 'fs'
import { snakeCase } from 'string-fn'
import { getDirBee } from './init'

export function removeBee(id, label){
  const filePath = glue(
    `${ getDirBee() }
    ${ snakeCase(id, true) }
    ${ snakeCase(label, true) }.json`,
    '/'
  )

  if (!existsSync(filePath)) return false

  unlinkSync(filePath)

  return true
}
