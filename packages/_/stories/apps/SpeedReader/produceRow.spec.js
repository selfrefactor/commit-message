import { produceRow } from './produceRow.js'
import { take, map, range, glue } from 'rambdax'
const CHARS = 'abcdefghijklmnopqrstuvwxyz'

test('happy', () => {
  const result = map(
    x => {
      const sk = produceRow(take(x, CHARS))
      const inFocus = sk[ 10 ] + sk[ 11 ]

      return glue(` 
        ${ x } with focus 
        '${ inFocus }' 
        and length ${ sk.length }: 
        '${ sk }'
      `)
    },
    range(1, 27)
  )
  expect(result).toMatchSnapshot()
})
