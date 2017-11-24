const R = require('rambdax')
const fs = require('fs-extra')
const { resolve } = require('path')
const { unlinkSync } = require('fs')

function rename(projectName) {
  const packageJsonLocation = resolve(__dirname, '../package.json')
  const renameLocation = `${__dirname}/rename.js`
  
  const packageJson = fs.readJsonSync(packageJsonLocation)
  
  const name = R.replace('node-starter', projectName, packageJson.name)
  const description = projectName
  const repository = R.replace('node-starter', projectName, packageJson.repository)
 
  const newPackageJson = R.merge(
    packageJson,
    {
      name,
      description,
      repository,
    }
  )

  fs.writeFileSync(packageJsonLocation, JSON.stringify(newPackageJson, null, '  '))

  const watchLocation = `${__dirname}/watch.js`
  const watchContent = fs.readFileSync(watchLocation).toString()
  
  const newWatchContent = R.replace(
    `lastUsed('node starter')`, 
    `lastUsed('${projectName}')`, 
    watchContent
  )
  
  fs.writeFileSync(watchLocation, newWatchContent)

  unlinkSync(renameLocation)  
}

rename(process.argv[2])