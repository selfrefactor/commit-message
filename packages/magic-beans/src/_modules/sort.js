const {
  filter,
  flatten,
  head,
  init,
  last,
  map,
  match,
  piped,
  prop: propMethod,
  replace,
  sort: sortMethod,
  sortBy,
  tail,
  trim,
} = require('rambdax')
const WAITING = 'WAITING'
const ACTIVE = 'ACTIVE'

const isObject = lines => {
  const firstLine = head(lines)
  const okOpen = firstLine.includes('={') || firstLine.includes('= {')
  const isEndOfObject = firstLine.includes('}')

  return okOpen && !isEndOfObject
}

const isOneLineObject = lines => {
  const firstLine = lines[ 0 ]
  const okOpen =
    firstLine.includes('import {') ||
    firstLine.includes('import{') ||
    firstLine.includes('const {') ||
    firstLine.includes('const{')

  const isEndOfObject = firstLine.includes('}')

  return okOpen && isEndOfObject
}

const isFunctionInput = lines => {
  const firstLine = lines[ 0 ]

  return firstLine.includes('function') && firstLine.includes('({')
}

function parseFunctionInput(line){
  const [ opening, rest ] = line.split('{')
  const [ middle ] = rest.split('}')

  const parsed = piped(
    middle,
    x => x.split(','),
    map(trim),
    map(appendComma),
    sortMethod((a, b) => a > b ? 1 : -1),
    map(x => '  ' + x)
  )

  return [
    `${ opening }{`,
    ...parsed,
    '}){',
  ]
}

function parseOneLineObject(line){
  const [ opening, rest ] = line.split('{')
  const [ middle, closing ] = rest.split('}')
  const parsed = piped(
    middle,
    x => x.split(','),
    map(trim),
    map(appendComma),
    sortMethod((a, b) => a > b ? 1 : -1),
    map(x => '  ' + x)
  )

  return [ `${ opening }{`, ...parsed, `}${ closing }` ]
}

const simpleSort = (a, b) => a === b ? 0 : a > b ? 1 : -1

const isSimple = line => {
  const hasBrackets = line.includes(':{') || line.includes(': {')
  const isOneLineObject = hasBrackets && line.includes('}')

  return hasBrackets ? isOneLineObject : true
}

const getProp = line => init(head(match(/[a-zA-Z\s]+:/, line)))

const isClosingBracket = line =>
  line.trim() === '}' || line.trim() === '},'

const appendComma = x => x.endsWith(',') ? x : `${ x },`

const concat = holderInstance => {
  const {
    shorthand,
    complex,
    prop,
    propValue,
    lastLine,
  } = holderInstance
  if (shorthand){
    return appendComma(`${ prop }`)
  }
  if (!complex){
    return appendComma(`${ prop }:${ propValue }`)
  }

  return [ `${ prop }: {`, ...propValue, appendComma(lastLine) ]
}

function sortProps(lines){
  let firstLine = ''
  let lastLine = ''
  const filtered = piped(
    lines,
    filter(x => x !== ''),
    linesInstance => {
      lastLine = last(linesInstance)

      return init(linesInstance)
    },
    linesInstance => {
      firstLine = head(linesInstance)

      return tail(linesInstance)
    }
  )
  const holder = []
  let status = WAITING
  let propHolder = ''
  let propChildrenHolder = []

  filtered.forEach(line => {
    if (
      isSimple(line) &&
      status === WAITING &&
      !line.includes(':')
    ){
      return holder.push({
        prop      : line,
        shorthand : true,
      })
    }

    if (isSimple(line) && status === WAITING){
      const prop = getProp(line)

      const propValue = holder[ prop ] = replace(
        `${ prop }:`,
        '',
        line
      )

      return holder.push({
        prop,
        propValue,
        complex : false,
      })
    }
    if (status === WAITING){
      status = ACTIVE
      propHolder = getProp(line)

      return
    }

    if (isClosingBracket(line)){

      holder.push({
        prop      : propHolder,
        propValue : propChildrenHolder.sort((a, b) => a.trim() > b.trim() ? 1 : -1),
        lastLine  : line,
        complex   : true,
      })
      status = WAITING
      propChildrenHolder = []

      return
    }
    propChildrenHolder.push(line)
  })

  const ordered = sortBy(propMethod('prop'), holder)

  return [ firstLine, ...flatten(ordered.map(concat)), lastLine ]
}

function sort(lines){
  if (lines.length === 1 && isOneLineObject(lines))
    return parseOneLineObject(lines[ 0 ])
  if (lines.length === 1 && isFunctionInput(lines))
    return parseFunctionInput(lines[ 0 ])
  if (lines.length < 2) return lines

  if (!isObject(lines)){
    return sortMethod(simpleSort, lines)
  }

  return sortProps(lines)
}

exports.sort = sort
