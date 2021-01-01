const {envFn} = require('env-fn')
envFn('special')
const {buildStarsOf} = require('build-stars-of')
const {allModes} = require('./config')
const { mapAsync } = require('rambdax')

void async function main(){
  await mapAsync(
    async prop => await buildStarsOf(allModes[prop]),
    Object.keys(allModes)
  )
}()