const R = require('rambdax')
const fs = require('fs-extra')
const { unlinkSync } = require('fs')
const { resolve } = require('path')

function clean() {
  const packageJsonLocation = resolve(__dirname, '../package.json')
  const yarnLockLocation = resolve(__dirname, '../yarn.lock')
  const testsLocation = resolve(__dirname, '../__tests__')
  const ciLocation = resolve(__dirname, '../.circleci')
  const cleanLocation = `${__dirname}/clean.js`

  const packageJson = fs.readJsonSync(packageJsonLocation)
  
  const devDependencies = R.omit(
    '@types/jest,fs-extra,jest,ts-jest', 
    packageJson.devDependencies
  )
  
  const scripts = R.omit(
    'test,cover,rename,clean', 
    packageJson.scripts
  )

  const newPackageJson = R.compose(
    R.flip(R.merge)({scripts, devDependencies}),
    R.omit('jest')
  )(packageJson)

  fs.writeFileSync(packageJsonLocation, JSON.stringify(newPackageJson, null, '  ')) 
  
  fs.removeSync(testsLocation)
  fs.removeSync(ciLocation)

  unlinkSync(yarnLockLocation)
  unlinkSync(cleanLocation)
}

clean()