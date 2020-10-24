exports.SEPARATORS = [ 'sep', 'sepx', 'separator', 'separatorx' ]

const BACK_MODES = [ 'back', 'back.foo', 'back.bar', 'back.baz' ]

const TEXT_MODES = [ 'foo', 'bar', 'baz', 'random' ]

exports.BACK_MODES = BACK_MODES
exports.TEXT_MODES = TEXT_MODES
exports.POSSIBLE_MODES = [ ...BACK_MODES, ...TEXT_MODES, 'obj', 'big', 'box' ]
