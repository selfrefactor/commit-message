import { parse} from './parse'
import { readFileSync } from 'fs';
import { resolve } from 'url';

const input = JSON.parse(
  readFileSync(resolve(__dirname, '../a.json')).toString()
)

test('', () =>{
  const result = parse('mehr',input)
  const expectedResult = ''

  expect(
    result
  ).toEqual(expectedResult)
})