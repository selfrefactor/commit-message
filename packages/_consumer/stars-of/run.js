const {envFn} = require('env-fn')
envFn('special')
const {buildStarsOf} = require('build-stars-of')
const {outputJson} = require('fs-extra')
const {allModes} = require('./config')

const currentMode = 'puppeteer'

void async function main(){
  const input = allModes[currentMode]
  if(!input){
    throw new Error('!input')
  }

  const data = await buildStarsOf(input)
  await outputJson(`${__dirname}/${currentMode}-result.json`, data, {spaces : 2})
}()