const {resolve} = require('path')
const {replace} = require('rambdax')
const {readFileSync, writeFileSync} = require('fs')

const LOCATION = resolve(
  __dirname,
  '../../dist/index.html'
)

const PRELOAD = '<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>'
const HEAD = '</head>'
const BODY = '</body>'

const NO_SCRIPT = `
<noscript>
I Learn Smarter is bundle of free education applications. It works in six language combinations:

- Engish to German
</noscript>
`

function editHTML(){
  const html = readFileSync(LOCATION).toString()
  
  const cleaner = replace(
    / type=\"text\/javascript"/g,
    '',
    html
  )

  const withPreload = replace(
    HEAD,
    `${PRELOAD}${HEAD}`,
    cleaner
  )
  const withNoScript = replace(
    BODY,
    `${NO_SCRIPT}${BODY}`,
    withPreload
  )

  writeFileSync(
    LOCATION,
    withNoScript
  )
}

exports.editHTML = editHTML