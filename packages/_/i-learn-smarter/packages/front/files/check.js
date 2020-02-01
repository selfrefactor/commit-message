const {check} = require('../../do/dist/')
const {resolve} = require('path')

check(
  resolve(
    __dirname,
    '../src'
  )
)