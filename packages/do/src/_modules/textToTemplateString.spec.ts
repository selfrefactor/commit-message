import { resolve } from 'path'
import { textToTemplateString } from './textToTemplateString'

const templateLocation = resolve(
  __dirname,
  '../../templates/component/typingsProps.txt',
)

test('', () => {
  const result = textToTemplateString(
    templateLocation,
    {
      name: 'foo',
      marker: '// INJECT_COMPONENT_MARKER',
      interfaceProps: ['a: number', 'b?: boolean', 'c: string'],
    },
  )

  expect(
    result,
  ).is('string')
})
