export const ASK_FOR_TYPE = 'What is the type of the commit?'
export const ASK_FOR_MESSAGE = 'What is the message of the commit?'

interface CommitType {
  key: string
  value: string
}

export const FEATURE_START = {
  key: 'FEATURE_START',
  value: 'feat:start',
}

export const FEATURE_END = {
  key: 'FEATURE_END',
  value: 'feat:end',
}

export const TEST_START = {
  key: 'TEST_START',
  value: 'test:start',
}

export const TEST_END = {
  key: 'TEST_END',
  value: 'test:end',
}

export const FIX_START = {
  key: 'FIX_START',
  value: 'fix:start',
}

export const FIX_END = {
  key: 'FIX_END',
  value: 'fix:end',
}

export const SUPPORT = {
  key: 'SUPPORT',
  value: 'choir:',
}

export const REFACTOR = {
  key: 'SUPPORT',
  value: 'refactor:',
}

export const DOCS = {
  key: 'DOCS',
  value: 'docs:',
}

export const typesOfCommit: CommitType[] = [
  DOCS,
  FEATURE_END,
  FEATURE_START,
  FIX_START,
  FIX_END,
  REFACTOR,
  SUPPORT,
  TEST_END,
  TEST_START,
]

export const typesOfCommitKeys: string[] = typesOfCommit.map(x => x.key)

export const explanationOfTypes: string[] = [
  `${FIX_START.key} - start of fixing an issue`,
  `${FEATURE_START.key} - start of add new functionality`,
  `${TEST_START.key} - start of writing unit or end-to-end tests for specific feature`,
  `${REFACTOR.key} - refactor code without affecting functionality`,
  `${DOCS.key} - related to documentation of the project`,
  `${SUPPORT.key} - cleaning tasks, such as remove unnecessary files or linting files.`,
]
