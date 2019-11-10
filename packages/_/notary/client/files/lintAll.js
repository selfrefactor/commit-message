const klawSync = require('klaw-sync')
const { exec } = require('child_process')

const { log } = require('log')
const { composeAsync, mapFastAsync, prop, takeLast } = require('rambdax')
const { resolve, parse } = require('path')

const execCommand = command =>
  new Promise((resolve, reject) => {
    const proc = exec(command, { cwd : resolve(__dirname, '../') })

    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', err => reject(err))
  })

async function lintAll (listOfPaths) {
  await mapFastAsync( async ( filePath ) =>{
    const { base } = parse(filePath)
    log('lint start',base, `icon.tag=${base}`)
    await execCommand(`tslint ${ filePath } --fix`)
    
    await execCommand(`tsfmt -r ${ filePath }`)
    log('format over',takeLast(20, filePath), `icon.tag=${base}`)
  })(listOfPaths)

  return 
}


async function lintAllSrcFolder(){
  try {
    const allFilesRaw = klawSync(
      resolve(__dirname, '../src'),
      {
        nodir  : true,
      }
    )
  
    const allFiles = allFilesRaw.map(prop('path'))
  
    const allowedFiles = allFiles.filter(filePath => 
      !filePath.includes('__snapshots__') &&
      ( filePath.endsWith('ts') || filePath.endsWith('tsx') )
    )
  
    await lintAll(allowedFiles)
  
    log('', 'success')
  } catch (e) {
    console.log(e)
  }
}

lintAllSrcFolder()