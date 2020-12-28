const {buildStarsOf} = require('build-stars-of')
const {allModes} = require('./config')

const currentMode = 'rambda'

void async function main(){
  const input = allModes[currentMode]
  if(!input){
    throw new Error('!input')
  }

  await buildStarsOf(input) 
}()