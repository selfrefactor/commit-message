import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { getConvertedNamespace } from '../_helpers/getConvertedNamespace'
import { getDB } from './getDB'

const LOCATION = resolve(__dirname, '../../files/db.json')

test.skip('', async () => {
  try{
    const dataRaw = JSON.parse(readFileSync(LOCATION).toString())
    // const dbValue = getDB({
    //   db: data,
    //   fromLanguage: 'BG',
    //   toLanguage: 'EN',
    // })

    // expect(data[0].bgPart).toBeTruthy()
    // expect(dbValue).toBeGreaterThan(31)
    // expect(dbValue.length).toBeGreaterThan(31)
  }catch (e){
    // console.log(e)
  }
})

test('convertedNamespace', async () => {
  const imageURL = 'https://some23432.com/a/bb/ccc/dddd/foo.png'
  const expectedResult = 'some23432_foo.png'

  const result = getConvertedNamespace(
    imageURL,
  )

  expect(result).toEqual(expectedResult)
})
