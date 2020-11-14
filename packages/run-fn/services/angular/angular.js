const { existsSync } = require('fs')
const { log } = require('helpers-fn')
const { CWD } = require('../../constants')
const { readJson, writeJson } = require('fs-extra')
const { range, repeat, filter, map, remove, piped } = require('rambdax')
const { resolve } = require('path')

function findSource(){
  let found = ''
  range(1,6).forEach(i => {
    if(found) return
    const relativePath = repeat('../', i) + 'ng-foo/package.json'
    const maybePath = resolve(CWD, relativePath)
    if(existsSync(maybePath)) found = maybePath
  })

  return found
}

function getUpdatedDependencies(target, source){
  const getUpdatedDependenciesFn = mainProp => piped(
    source[mainProp],
    filter((_, prop) => Boolean(target[mainProp][prop])),
    map(remove(['^','~']))
  )
  
  const newDevDeps = getUpdatedDependenciesFn('devDependencies')
  const newDeps = getUpdatedDependenciesFn('dependencies')
  const newTarget = {
    ...target,
    dependencies: {
      ...target.dependencies,
      ...newDeps
    },
    devDependencies: {
      ...target.devDependencies,
      ...newDevDeps
    }
  }

  return newTarget
}

async function angular(){
  const targetPath = `${CWD}/package.json`
  if(!existsSync(targetPath)){
    throw new Error(`${targetPath} does not exist`)
  }
  const sourcePath = findSource()
  if(!sourcePath){
    throw new Error(`folder 'ng-foo' is missing`)
  }
  const targetInfo = await readJson(targetPath)
  const sourceInfo = await readJson(sourcePath)

  const updatedDependencies = getUpdatedDependencies(
    targetInfo,
    sourceInfo
  )

  await writeJson(
    targetPath,
    updatedDependencies,
    {spaces: 2}
  )
  log('done', 'success')
}

exports.angular = angular
