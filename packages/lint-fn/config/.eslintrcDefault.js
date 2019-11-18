const baseRules = require('./.eslintBase')
const {filter} = require('./filter')

const rules = {
  ...baseRules,
  'no-unsafe-regex/no-unsafe-regex': 2,
  'sort-requires/sort-requires': 1,
  'async-await/space-after-async': 1,
  'async-await/space-after-await': 1,
}

module.exports = {
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  env: {es6: true},
  plugins: [
    'async-await',
    'no-unsafe-regex',
    'simple-import-sort',
    'sort-requires',
  ],
  rules: filter(rules),
}
