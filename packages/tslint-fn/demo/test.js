const execa = require('execa')
const {exec} = require('child_process')
const {glue} = require('rambdax')

const execCommand = (command, cwd) =>
  new Promise((resolve, reject) => {
    const proc = exec(command, {
      cwd,
      env: process.env,
    })
    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', err => reject(err))
  })

async function whenPrettier(filePath, withTypescript = true) {
  const typescriptPart = withTypescript ? '' : '--parser typescript'

  const command = glue(`
  prettier 
  --no-semi
  --no-bracket-spacing
  --print-width 100
  --single-quote
  --no-bracket-spacing
  --jsx-single-quote
  --trailing-comma es5
  --write
  ${typescriptPart}
  ${filePath}
`)
  await execCommand(command, __dirname)
}

void (async function testLint() {
  console.time('lint')
  await whenPrettier('/home/s/repos/_/eslint-ts-demo/src/foo.ts')
  const output = await execa('yarn', ['lint'], {cwd: __dirname})

  console.log(output.stdout)
  console.timeEnd('lint')
})()
