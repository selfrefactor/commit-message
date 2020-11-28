/*
  For some reason, VSCode starts using too much resources via its `node` process
*/

const {
  split,
  map,
  filter,
  piped,
  tail,
  drop,
  join,
  mapAsync,
  last,
  trim,
  filterAsync,
} = require('rambdax')
const { exec } = require('./exec')
const { head } = require('rambda')
const { log } = require('../log/log')

const getAllPIDsCommand = 'ps -ax'
const getTopPIDs = 'ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head'

function parseTopPidLine(line){
  console.log({line})
}

function parseLine(line){
  const pid = piped(
    line,
    split(' '),
    filter(x => x.trim().length),
    head,
    Number
  )

  const label = piped(
    line, split(':'), last, drop(3), trim
  )

  return {
    label,
    pid,
  }
}

const MARKER = 'visual-studio-code/code'

async function killVSCode(){
  const pidsData = await exec({
    cwd     : __dirname,
    command : getAllPIDsCommand,
    onLog   : () => {},
  })

  const pids = piped(
    pidsData,
    join('\n'),
    split('\n'),
    filter(Boolean),
    tail,
    map(parseLine)
  )

  /*
  usually it is npm registry command
  I removed it from settings, so maybe we won't see this use case anymore

  const topPidsData = await exec({
    cwd     : __dirname,
    command : getTopPIDs,
    onLog   : () => {},
  })
  const topPids = piped(
    topPidsData,
    join('\n'),
    split('\n'),
    filter(Boolean),
    map(parseTopPidLine)
  )
  */
  const filtered = filter(x => x.pid > 10000, pids)

  async function predicate(x){
    try {
      return x.label.includes(MARKER)
    } catch (error){
      console.log('inactive pid')

      return false
    }
  }
  const found = await filterAsync(predicate, filtered)
  if (found.length === 0) throw new Error('found.length === 0')

  const killIterator = async ({ pid }) => {
    try {
      await exec({
        cwd     : __dirname,
        command : `kill -9 ${ pid }`,
        onLog   : () => {},
      })
    } catch (_){
      log('error in killing a process', 'warning')
    }
  }

  await mapAsync(killIterator, found)
}

exports.killVSCode = killVSCode
