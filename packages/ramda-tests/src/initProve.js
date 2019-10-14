const { exec } = require('helpers')
const { glue } = require('rambdax')

const getOutputPath = x => `${ process.env.HOME }/repos/services/packages/ramda-tests/outputs/${ x }.txt`

const getCommand = x => glue(`
BABEL_ENV=cjs
node 
node_modules/mocha/bin/mocha
--require 
@babel/register 
--reporter
spec 
test/${ x }.js
> ${ getOutputPath(x) } 2>&1
`)

void async function checkSingleMethod(method){
  await exec({
    cwd     : '/home/matrix/repos/services/packages/ramda-tests/ramda',
    command : getCommand(method),
  })

}('add')
