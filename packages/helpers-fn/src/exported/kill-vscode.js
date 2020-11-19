/*
  For some reason, VSCode starts using too much resources via its `node` process

  TODO:

  For now it just stops `code` but actually it should find the abusing `node` pid and kill it
*/

var pidusage = require('pidusage')
const { head } = require('rambda')
const { split, map, filter, piped, tail, drop, join, mapAsync, last, trim, find, filterAsync } = require('rambdax')
var {exec} = require('./exec')

const getAllPIDsCommand = `ps -ax`

function parseLine(line) {
  const pid =  piped(
    line,
    split(' '),
    filter(x => x.trim().length),
    head,
    Number
  )

  const label =  piped(
    line,
    split(':'),
    last,
    drop(3),
    trim
  )

  return {label, pid} 
}

const MARKER = 'visual-studio-code/code'

async function killVSCode(){
  const pidsData = await exec({
    cwd: __dirname,
    command: getAllPIDsCommand,
    onLog: () => {}
  })
  const pids = piped(
    pidsData,
    join('\n'),
    split('\n'),
    filter(Boolean),
    tail,
    map(parseLine),
  )
  const plasmaPID = find(
    x => x.label === '/usr/bin/plasmashell',
    pids
  )
  if(!plasmaPID) throw new Error('!plasmaPID')

  const filtered = filter(x => x.pid > 10000, pids)
  const abusers = []
  async function predicate(x){
    try {
      const stats = await pidusage(x.pid)
      if(stats.cpu !== 0){
        abusers.push({...x, stats})
      }
      if(stats.ppid === plasmaPID.pid){
        return x.label.includes(MARKER)
      }
      return false
    } catch (error) {
       console.log('inactive pid') 
       return false
    }
  }
  const [found] = await filterAsync(predicate, filtered)
  if(!found) throw new Error('!found')
  console.log({abusers})
  
  await exec({
    cwd: __dirname,
    command: `kill -9 ${found.pid}`,
    onLog: () => {}
  })
}

exports.killVSCode = killVSCode