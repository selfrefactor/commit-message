const download = require('download')
const { flatten, maybe, uuid, allFalse } = require('rambdax')
const { readFileSync, createWriteStream } = require('fs')

const FILE = `${ __dirname }/chrome_bookmarks.json`
const content = flatten(JSON.parse(readFileSync(FILE).toString()))
const STORED_ID = '216'

let counter = 0

content.forEach(x => {
  if (x.parentId === STORED_ID){
    const isPng = x.url.includes('.png')
    const isJpg = x.url.includes('.jpg')
    const isGif = x.url.includes('.gif')
    if (allFalse(
      isPng,
      isJpg,
      isGif
    )) return

    const extension = maybe(
      isPng,
      'png',
      isJpg ? 'jpg' : 'gif'
    )
    const output = `${ __dirname }/out/${ uuid() }.${ extension }`
    console.log(counter++)
    download(x.url)
      .pipe(createWriteStream(
        output
      )
      )
  }
})
