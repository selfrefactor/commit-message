const rules = require('./.eslintBase.js')

const jestRules = {
  'jest/consistent-test-it': 1,
  'jest/lowercase-name': 1,
  'jest/no-alias-methods': 1,
  'jest/prefer-strict-equal': 0,
  'jest/require-tothrow-message': 0,
  'jest/no-identical-title': 1,
  "jest/no-large-snapshots": [1, { "maxSize": 300 }],
}

module.exports = {
  parser  : 'babel-eslint',
  plugins : [
    'async-await',
    'jest'
  ],
  env : {
    jasmine : true,
    jest    : true,
  },
  rules : {...rules, ...jestRules},
}
