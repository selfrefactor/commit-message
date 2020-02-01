/**
 * Allow lines in index.tsx to be show/hidden
 */
const {
  readFileSync,
  writeFileSync,
} = require('fs')

const showMode = process.argv[2] === '--show'
const hideMode = process.argv[2] === '--hide'

const {resolve} = require('path')
const {drop} = require('rambdax')

const location = resolve(
  __dirname,
  '../src/index.tsx'
)

const content = readFileSync(location).toString()

const WAITING = 'WAITING'
const READY = 'READY'
const DEV_ONLY = '// DEV_ONLY'

let mode = WAITING

const newContent = content
  .split('\n')
  .map(line => {
    if(
      mode === WAITING &&
      line.trim() === DEV_ONLY
    ){
      mode = READY
    }else if(mode === READY){
      mode = WAITING

      if(showMode){
        return line.startsWith('// ') ? 
          drop(3, line) :
          line
      }

      if(hideMode){
        return line.startsWith('// ') ? 
          line :
          `// ${line}` 
      }
    }

    return line
  })
  .join('\n')

writeFileSync(
  location,
  newContent
)