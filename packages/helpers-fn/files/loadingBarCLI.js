const { delay, defaultTo, repeat } = require('rambdax')

const OK = Boolean(process.stderr.isTTY)

const defaultInput = {
  numberBars : 6,
  step       : 500,
  symbol     : '=',
  stopAfter  : 30000,
}

const clear = () => {
  if (!OK) return
  process.stderr.clearLine()
  process.stderr.cursorTo(0)
}

function getSymbolFn(totalLength, a){
  let counter = 1

  return () => {
    counter = counter === totalLength ? 0 : counter + 1

    return [ a, counter ]
  }
}

let intervalHolder
let timeoutHolder

async function rabbitHole(getSymbol, step){
  const [ symbol, counter ] = getSymbol()
  if (OK){
    process.stderr.write(symbol)
    await delay(step - 20)
  } else {
    console.log(repeat(symbol, counter).join(''))
    await delay(1000)
  }

  if (counter === 0){
    clear()
  }
}

function startLoadingBar(input){
  const { numberBars, step, symbol, stopAfter } = {
    ...defaultInput,
    ...defaultTo({}, input),
  }

  const getSymbol = getSymbolFn(numberBars, symbol)

  intervalHolder = setInterval(() => {
    rabbitHole(getSymbol, step)
  }, step)

  timeoutHolder = setTimeout(() => {
    clearInterval(intervalHolder)
    clear()
  }, stopAfter)
}

function stopLoadingBar(){
  clearInterval(intervalHolder)
  clearTimeout(timeoutHolder)
  if (!OK) return
  process.stderr.clearLine()
  process.stderr.cursorTo(0)
}

exports.startLoadingBar = startLoadingBar
exports.stopLoadingBar = stopLoadingBar
