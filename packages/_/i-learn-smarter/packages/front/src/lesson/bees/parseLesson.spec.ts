import { pass } from 'rambdax'
import { parseLessonBee } from './parseLesson'

const input = `
# Happy path

SK

foo

bar
---
Maybe Niketa has[have][had] a nice[polite][expensive] smile.

> Кейт има хубава усмивка.
---
# With more than 3 choices 
---
Kate used[had][need][want][require] to smoke but now she runs[run][ran] a lot instead.
---
# With two options
---
Kate used[had] to smoke but now she runs[run] a lot instead.
`

const exampleSchema = {title:'string', example:'string', translation:'string'}
const contentSchema = {title:'string', text:['string']}

test('', () =>{
  const result = parseLessonBee(input)
  
  result.forEach(resultInstance => {
    const okExample = pass(resultInstance)(exampleSchema)
    const okContent = pass(resultInstance)(contentSchema)
    
    expect(okExample || okContent).toBeTruthy()
  })
})
