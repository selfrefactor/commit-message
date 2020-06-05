const _ = require('lodash')
const R = require('rambda')
const Ramda = require('ramda')
const Utils = require('../benchmark-utils.js')

const lodash = {
  label : 'Lodash',
  fn    : () => {
    const fn = Utils.F
    const list = Utils.range(0,1000)

    return () => _.find(list, fn)
  },
}

const rambda = {
  label : 'Rambda',
  fn    : () => {
    const fn = Utils.F
    const list = Utils.range(0,1000)

    return  () =>R.find(fn, list)
  },
}
const rambdaCurried = {
  label : 'Rambda',
  fn    : () => {
    const fn = Utils.F
    const list = Utils.range(0,1000)

    return  () =>R.find(fn)(list)
  },
}

const ramda = {
  label : 'Ramda',
  fn    : () => {
    const fn = Utils.F
    const list = Utils.range(0,1000)

    return  () => Ramda.find(fn, list)
  },
}

const ramdaCurried = {
  label : 'Ramda',
  fn    : () => {
    const fn = Utils.F
    const list = Utils.range(0,1000)

    return  () => Ramda.find(fn)(list)
  },
}

module.exports = [
  {label: 'allPass', suites: [ rambda, ramda, lodash ]},
  {label: 'allPass#curried', suites: [ rambdaCurried, ramdaCurried ]},
]
