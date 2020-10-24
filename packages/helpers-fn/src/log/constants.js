exports.SEPARATORS = [ 'sep', 'sepx', 'separator', 'separatorx' ]

const BACK_MODES = [
  'back',
  'back.foo',
  'back.bar',
  'back.baz',
  'back.random',
]
const TEXT_MODES = [ 'foo', 'bar', 'baz', 'random' ]
const ICON_MODES = [ 'success', 'warning', 'info', 'error' ]

exports.BACK_MODES = BACK_MODES
exports.TEXT_MODES = TEXT_MODES
exports.POSSIBLE_MODES = [
  ...BACK_MODES,
  ...TEXT_MODES,
  ...ICON_MODES,
  'obj',
  'big',
  'box',
]

const SUCCESS_COLOR = '#44aa11'
const INFO_COLOR = '#1B9EB3'
const ERROR_COLOR = '#B31C25'
const WARNING_COLOR = '#f35C25'
exports.ICON_MODES = ICON_MODES

exports.SUCCESS_COLOR = SUCCESS_COLOR
exports.INFO_COLOR = INFO_COLOR
exports.WARNING_COLOR = WARNING_COLOR
exports.ERROR_COLOR = ERROR_COLOR

exports.chalkFront = [
  '#CC7450',
  '#548185',
  '#B3cC25',
  SUCCESS_COLOR,
  INFO_COLOR,
  ERROR_COLOR,
  WARNING_COLOR,
]
