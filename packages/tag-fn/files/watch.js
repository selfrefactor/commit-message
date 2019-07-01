const watchFn = require('watch-fn')
const {exec} = require('child_process')
const CWD = '/home/s/imc_projects/imc-react-api/client'
const JEST = `${CWD}/node_modules/jest/bin/jest.js`
const options = {
  directory: '/home/s/imc_projects/imc-react-api/client/app/components',
  pwd: CWD,
  commands: {
    jsx: watch
  }
}

function run(command){
  return new Promise(resolve => {
    exec(command, {cwd:CWD}, (_, stdout, __)=> {
      console.log(_, stdout, __)
      return resolve(stdout.toString())
    })
  })
}

async function watch(filePath){
  console.log(filePath, 'filePath')
  const command = `${JEST} --json --onlyChanged`
  // numPassedTests
  // numFailedTests
  console.log('start Jest')
  const result = await run(command)
  console.log(JSON.parse(result))
}

watchFn.start(options).then(console.log)