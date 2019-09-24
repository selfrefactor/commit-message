const { glue, replace } = require('rambdax')
const { readFileSync, writeFileSync } = require('fs')

const PARCEL_WRONG_FILE_LOCATION = glue(`
  ${ process.cwd() }
  node_modules
  parcel-bundler
  src
  transforms
  babel
  jsx.js
`, '/')

function fix(){
  const content = readFileSync(PARCEL_WRONG_FILE_LOCATION).toString()

  const fixed = '{pragma, pragmaFrag: \'React.Fragment\'}'
  if (content.includes(fixed)) return console.log('Already fixed')

  const withFixed = replace(
    '{pragma}',
    fixed,
    content
  )

  writeFileSync(PARCEL_WRONG_FILE_LOCATION, withFixed)
  console.log('fixed')
}

fix()
