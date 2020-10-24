import {
  compose,
  head,
  identity,
  last,
  split,
} from 'rambdax'

export function getYoutubeID(url) {

  return compose(
    last,
    identity,
    split('?v='),
    head,
    identity,
    split('&'),
  )(url)
}
