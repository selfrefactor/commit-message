const {readFileSync, writeFileSync} = require('fs')
const { renameProps} = require('rambdax')

const LOCATION = `${process.cwd()}/package.json`

function toggleBabel(mode){
  const initialContent = readFileSync(
    LOCATION
  ).toString()

  const packageJson = JSON.parse(initialContent)
  const noNeed = 
    (mode && packageJson.babel) ||
    (!mode && packageJson.babelx)
  
  if(noNeed) return console.log('No need for `toggleBabel`')

  const renameRules = mode ?
    {babelx: 'babel'} :
    {babel: 'babelx'}

  
  const newPackageJson = renameProps(renameRules, packageJson)
  
  writeFileSync(
    LOCATION,
    JSON.stringify(newPackageJson, null, 2)
  )
}

toggleBabel(
  process.env.BABEL_ON === 'true'
)