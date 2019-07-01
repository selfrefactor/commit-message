const {save, load} = require('./')

save(
  'FIRST_CONTEXT',
  'SECOND_CONTEXT',
  [1, 2, 3]
)

console.log(load('FIRST_CONTEXT'))

console.log(load(
  'FIRST_CONTEXT',
  'SECOND_CONTEXT',
))