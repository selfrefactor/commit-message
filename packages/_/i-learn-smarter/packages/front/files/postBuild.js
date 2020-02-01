const path = require('path')
const { emptyDirSync, copySync } = require('fs-extra')

const resolve = relativePath => path.resolve(__dirname, relativePath)

/**
 * move `./dist` folder to `server/public`
 */
const serverPublic = resolve('../../../../on/lambdas/ils/static_dist')
emptyDirSync(serverPublic)
const dist = resolve('../dist')
copySync(dist, serverPublic, { overwrite : true })
