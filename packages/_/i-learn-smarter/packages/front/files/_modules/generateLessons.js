const {get} = require('axios')
const {writeFileSync} = require('fs')
const {titleCase} = require('string-fn')
const {
  prop, 
  template, 
  prepend, 
  multiline, 
  trim, 
  map, 
  remove, 
  reject, 
  s,
  join,
} = require('rambdax')
const {JSDOM} = require('jsdom')

const URL = 'https://gitlab.com/dejantoteff/lessons/tree/master'
const SELECTOR = 'td.tree-item-file-name'
const TITLE = '# LESSONS\n\nhttp://bit.ly/krumpopov'
const TEMPLATE = multiline(`
  ## [{{title}}]
  (https://ilearnsmarter.com/lesson-{{tag}})
`, '')
const OUTPUT = '/home/s/repos/front/files/LESSONS.md'
s()

void async function generateLessons(){
  const {data} = await get(URL)
  const dom = new JSDOM(data)
  const els = Array.from(dom.window.document.querySelectorAll(
    SELECTOR
  ))

  const lessons = els.s(map(prop('textContent')))
    .s(map(trim))
    .s(reject(x => x === 'README.md'))
    .s(map(
      x => template(
        TEMPLATE, {
          tag: remove('.md', x),
          title: titleCase(remove('.md', x))
        })
    ))
    .s(prepend(TITLE))
    .s(join('\n\n'))
  
   writeFileSync(OUTPUT, lessons)     
}()