const {envFn} = require('env-fn')
envFn('special')
const {allModes} = require('./config')
const { mapAsync } = require('rambdax')

void async function main(){
  const iterator = async (prop) => {
    // const {outputLocation, title, repo} = allModes[prop]
    // const content = await readFile(outputLocation)
  }
  const sorted = Object.keys(allModes).sort((a,b) => {
    if(allModes[a].priority === allModes[b].priority){
      const [,aTitle] = allModes[a].repo.split('/')
      const [,bTitle] = allModes[b].repo.split('/')
      return aTitle > bTitle ? 1: -1

    }
    return allModes[a].priority > allModes[b].priority ? 1: -1
  })
  console.log({sorted})
  const sk = await mapAsync(iterator, Object.keys(sorted))
}()