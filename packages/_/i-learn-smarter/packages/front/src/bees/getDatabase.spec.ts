import { readFileSync } from 'fs'
import { resolve } from 'path'
import { pluck } from 'rambdax'
import { getDatabaseBee } from './getDatabase'

const LOCATION = resolve(__dirname, '../../files/db.json')

test('works with Bulgarian', async () => {
  const dataRaw = JSON.parse(readFileSync(LOCATION).toString())
  const data = pluck<DBInstance>('doc', dataRaw.rows)

  const toEn = getDatabaseBee({
    db: data,
    fromLanguage: 'BG',
    toLanguage: 'EN',
  })
  const toDe = getDatabaseBee({
    db: data,
    fromLanguage: 'BG',
    toLanguage: 'DE',
  })
  const fromEn = getDatabaseBee({
    db: data,
    fromLanguage: 'EN',
    toLanguage: 'BG',
  })
  const fromDe = getDatabaseBee({
    db: data,
    fromLanguage: 'DE',
    toLanguage: 'BG',
  })

  expect(toEn.length).toBeGreaterThan(5)
  expect(toDe.length).toBeGreaterThan(5)
  expect(fromDe.length).toBeGreaterThan(5)
  expect(fromEn.length).toBeGreaterThan(5)
})
