const { map } = require('rambdax')

function filterRules(rules){
  if (!process.env.SKIP_ESLINT_RULES) return rules

  const FILTER = process.env.SKIP_ESLINT_RULES.split(',')

  const newRules = map((rule, prop) => FILTER.includes(prop) ? 0 : rule,
    rules)

  return newRules
}

exports.filter = filterRules
