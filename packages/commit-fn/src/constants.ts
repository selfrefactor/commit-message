import {CommitType, Label} from './typings'

export const ASK_FOR_TYPE = 'What is the type of the commit?'
export const ASK_FOR_LABEL = 'Select label'
export const ASK_FOR_CUSTOM_LABEL = 'Write your label'
export const ASK_FOR_MESSAGE = 'What is the message of the commit?'

export const FEATURE = {
  explanation: '💡   Add new feature',
  key: 'FEATURE',
  value: 'feat',
}

const TEST = {
  explanation: '🔍   Create unit or end-to-end test',
  key: 'TEST',
  value: 'test',
}

const FIX = {
  explanation: '🐛   Submit a bug fix',
  key: 'FIX',
  value: 'fix',
}

const SUPPORT = {
  explanation: '☂️   Chore',
  key: 'SUPPORT',
  value: 'chore',
}

const DOCS = {
  explanation: '✍   Edit documentation',
  key: 'DOCS',
  value: 'docs',
}

export const typesOfCommit: CommitType[] = [
  FEATURE,
  FIX,
  TEST,
  SUPPORT,
  DOCS,
]

export const explanationOfTypes: string[] = [
  `${FEATURE.key} - ${FEATURE.explanation}`,
  `${FIX.key} - ${FIX.explanation}`,
  `${SUPPORT.key} - ${SUPPORT.explanation}`,
  `${TEST.key} - ${TEST.explanation}`,
  `${DOCS.key} - ${DOCS.explanation}`,
]

export const NO_LABEL = 'NO_LABEL'

export const ALL_LABELS = [
  '🏗 bump',
  '💣 break',
  '🔪 deprecate',
  '📦 dep',
  '📝 examples',
  '⚠ important',
  '🚮 issue',
  '📨 publish',
  '🆗 small',
  '💋 style',
  '📚️ typings',
  'benchmark',
  'build',
  'docs',
  'lint',
  'method',
  'prepublish',
  'refactor',
  'script',
  'typings',
  'typings',
  'usage',
]
