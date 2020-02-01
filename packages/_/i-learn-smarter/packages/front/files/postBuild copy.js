const path = require('path')
const { editHTML } = require('./_helpers/editHTML')
const { emptyDirSync, copySync } = require('fs-extra')
const { log } = require('log')

editHTML()

const resolve = relativePath => path.resolve(__dirname, relativePath)

log('move start', 'info')

/**
 * move `./dist` folder to `server/public`
 */
const serverPublic = resolve('../../server/src/public')
emptyDirSync(serverPublic)

const dist = resolve('../dist')
const seo = resolve('../files/seo')
copySync(dist, seo, { overwrite : true })
copySync(
  '/home/s/repos/front/files/_helpers/google5e771a61a94b8871.html', 
  '/home/s/repos/front/files/seo/google5e771a61a94b8871.html', 
  { overwrite : true }
)

/**
 * Move favicon
 */
const favicon = resolve('./favicon.ico')
const seoFavicon = resolve('../files/seo/favicon.ico')
copySync(favicon, seoFavicon, { overwrite : true })

/**
 * Move seo
 */
copySync(seo, serverPublic, { overwrite : true })

/**
 * Move index.html to `server/views` folders
 */
const indexHTML = resolve('../../server/src/public/index.html')
const serverEJS = resolve('../../server/src/views/index.ejs')

copySync(indexHTML, serverEJS, { overwrite : true })

log('move end', 'success')
