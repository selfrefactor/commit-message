const { filter, head, path, pick } = require('rambdax')

const NO_VALUE = 'NO VALUE'

function parseSingleAuditFn(audits){
  return label => {
    const result = filter(x => x !== null,
      pick('score,displayValue', audits[ label ]))
    if (Object.keys(result).length === 0) return NO_VALUE

    if (Object.keys(result).length === 1){
      return head(Object.values(result))
    }

    return result
  }
}

function parseServer(audits){
  const toReturn = path('server-response-time.title', audits)

  return toReturn ? toReturn : NO_VALUE
}

function parseAudits(audits){
  if (!audits) return {}
  const parseSingleAudit = parseSingleAuditFn(audits)

  return {
    blockingResources   : parseSingleAudit('render-blocking-resources'),
    bytes               : parseSingleAudit('total-byte-weight'),
    dom                 : parseSingleAudit('dom-size'),
    firstPaint3G        : parseSingleAudit('first-contentful-paint-3g'),
    firstPaint          : parseSingleAudit('first-meaningful-paint'),
    images              : parseSingleAudit('uses-optimized-images'),
    interactive         : parseSingleAudit('interactive'),
    largestPaint        : parseSingleAudit('largest-contentful-paint'),
    layoutShiftElements : parseSingleAudit('layout-shift-elements'),
    requestsSummary     : parseSingleAudit('resource-summary'),
    responsiveImages    : parseSingleAudit('uses-responsive-images'),
    server              : parseServer(audits),
    spped               : parseSingleAudit('speed-index'),
    thirdParty          : parseSingleAudit('third-party-summary'),
    unused              : parseSingleAudit('unused-javascript'),
  }
}

const getPerformanceScore = path('categories.performance.score')
const getTiming = path('timing.total')

function parseLighthouse(input){
  return {
    ...parseAudits(input.audits),
    timing           : getTiming(input),
    performanceScore : getPerformanceScore(input),
  }
}

exports.parseLighthouse = parseLighthouse
