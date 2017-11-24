export const ASK_FOR_TYPE = 'What is the type of the commit?'
export const ASK_FOR_MESSAGE = 'What is the message of the commit?'

interface CommitType {
  key: string
  value: string
  explanation: string
}

const featureExplanation = 'start of add new functionality'

export const FEATURE_START = {
  explanation: featureExplanation,
  key: 'FEATURE_START',
  value: 'feat:start',
}

export const FEATURE_END = {
  explanation: featureExplanation,
  key: 'FEATURE_END',
  value: 'feat:end',
}

const testExplanation = 'writing unit or end-to-end tests for specific feature'

export const TEST_START = {
  explanation: testExplanation,
  key: 'TEST_START',
  value: 'test:start',
}

export const TEST_END = {
  explanation: testExplanation,
  key: 'TEST_END',
  value: 'test:end',
}

const fixExplanation = 'fixing an issue. Start with: \'broken\', \'missing typing\' ...'

export const FIX_START = {
  explanation: fixExplanation,
  key: 'FIX_START',
  value: 'fix:start',
}

export const FIX_END = {
  explanation: fixExplanation,
  key: 'FIX_END',
  value: 'fix:end',
}

export const SUPPORT = {
  explanation: 'cleaning tasks, such as remove unnecessary files or linting files.',
  key: 'SUPPORT',
  value: 'choir:',
}

export const REFACTOR = {
  explanation: 'refactor code without affecting functionality',
  key: 'REFACTOR',
  value: 'refactor:',
}

export const DOCS = {
  explanation: 'add to the documentation of the project',
  key: 'DOCS',
  value: 'docs:',
}

export const typesOfCommit: CommitType[] = [
  FEATURE_END,
  FEATURE_START,
  FIX_START,
  FIX_END,
  TEST_END,
  TEST_START,
  REFACTOR,
  SUPPORT,
  DOCS,
]

export const typesOfCommitKeys: string[] = typesOfCommit.map(x => x.key)

export const explanationOfTypes: string[] = [
  `${FIX_START.key} - ${FIX_START.explanation}`,
  `${FEATURE_START.key} - ${FEATURE_START.explanation}`,
  `${TEST_START.key} - ${TEST_START.explanation}`,
  `${REFACTOR.key} - ${REFACTOR.explanation}`,
  `${DOCS.key} - ${DOCS.explanation}`,
  `${SUPPORT.key} - ${SUPPORT.explanation}`,
]
