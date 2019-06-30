import {
  compose,
  head,
  identity,
  split,
} from 'rambdax'

import {Identity} from '../../typings'

export const getUpdateURL: Identity<string> = compose(
  head,
  identity,
  split('#'),
)
