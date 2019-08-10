const { shuffle, defaultTo, random } = require('rambdax')

const PADDING = ';padding:7px 6px;'
const fontColors = shuffle([
  '#fafafa',
  '#faefe0',
  '#f9f6f1',
  '#f9f6f1',
  '#f7f7f7',
  '#f7f4f4',
  '#f7eeca',
  '#f6f6e9',
  '#f5f4e8',
  '#ede8e1',
  '#ebe6d9',
  '#e7e7e7',
  '#ede8e1',
  '#eae3cd',
])

const colorLogModes = [
  // ROUTE CHANGE 0
  `background: #aa769b; color: ${ fontColors[ 0 ] }`,
  // REDUCER LOG 1 - 3
  `background: #213a68; color: ${ fontColors[ 1 ] }`,
  `background: #034694; color: ${ fontColors[ 2 ] }`,
  `background: #0068a8; color: ${ fontColors[ 3 ] }`,
  // LOG 4 - 6
  `background: #de6571; color: ${ fontColors[ 4 ] }`,
  `background: #f85e9f; color: ${ fontColors[ 5 ] }`,
  `background: #ed5485; color: ${ fontColors[ 6 ] }`,
  // When no log index is defined 7 - 10
  `background: #779068; color: ${ fontColors[ 7 ] }`,
  `background: #60a917; color: ${ fontColors[ 8 ] }`,
  `background: #80cbc4; color: ${ fontColors[ 9 ] }`,
  `background: #018574; color: ${ fontColors[ 10 ] }`,
  // NEW_STATE_LOG_INDEX 11
  `background: #a29161; color: ${ fontColors[ 11 ] }`,
].map(
  x => `${ x }${ PADDING }`
)

// Colorized logs
// ============================================
function colorLog(logIndex, label, input){
  const index = defaultTo(
    random(0,fontColors.length - 1),
    logIndex
  )
  const colorMode = colorLogModes[ index ]

  console.log(
    `%c ${ label }`,
    colorMode,
    input ? input : ''
  )
}

exports.colorLog = colorLog
exports.colorLogModes = colorLogModes
exports.PADDING = PADDING
