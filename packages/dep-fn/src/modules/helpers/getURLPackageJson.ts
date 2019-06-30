import {
  compose,
  replace,
} from 'rambdax'

export const getURLPackageJson = compose(
  x => `https://raw.githubusercontent.com/${x}/master/package.json`,
  replace('https://github.com/', ''),
)
