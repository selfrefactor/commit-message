import { initialGetLocalize } from 'client-helpers'

export const autoOption = {
  visibleLabel : 'Enable automatic next',
  type         : 'TOGGLE',
  label        : 'overflower.auto.mode',
  value        : initialGetLocalize({
    key          : 'overflower.auto.mode',
    defaultValue : true,
  }),
}
export const batchSizeOption = {
  visibleLabel : 'Batch size to search within',
  label        : 'overflower.batch.size',
  type         : 'SLIDER',
  between      : [ 30, 100 ],
  value        : initialGetLocalize({
    key          : 'overflower.batch.size',
    defaultValue : 60,
  }),
}
export const speedOption = {
  visibleLabel : 'Speed in seconds',
  label        : 'overflower.auto.speed',
  type         : 'SLIDER',
  between      : [ 30, 120 ],
  value        : initialGetLocalize({
    key          : 'overflower.auto.speed',
    defaultValue : 120,
  }),
}
export const tagsOption = {
  label        : 'stackoverflow.tags',
  visibleLabel : 'Tags',
  type         : 'SELECT',
  choices      : [
    'review',
    'javascript,node.js,typescript',
    'angular,css,express',
    'css-selectors,css3,ramda,html',
    'react.js,typescript,rxjs',
    'golang',
  ],
  value : initialGetLocalize({
    key          : 'stackoverflow.tags',
    defaultValue : 'javascript,node.js,typescript',
  }),
}
