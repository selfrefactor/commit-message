const fs = require('fs-extra')
const path = require('path')

const sourcePublic = path.resolve(__dirname, '../dist')
const outputPublic = path.resolve(__dirname, '../../docker-service/service/src/public')
const outputLocalPublic = path.resolve(__dirname, '../../pm2-start/src/public')

fs.copySync(sourcePublic, outputPublic, {overwrite: true })
fs.copySync(sourcePublic, outputLocalPublic, {overwrite: true })

console.log('done')