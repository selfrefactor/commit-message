export const ASK_FOR_TYPE = 'What is the type of the commit?'
export const FEATURE = 'feat'
export const SUPPORT = 'choir'
export const REFACTOR = 'refactor'
export const DOCS = 'docs'
export const TEST = 'test'

export const typesOfCommit: string[] = [
  DOCS,
  FEATURE,
  REFACTOR,
  SUPPORT,
  TEST,
]

export const explanationOfTypes: string[] = [
  `${FEATURE} - add new functionality`,
  `${REFACTOR} - refactor code without affecting functionality`,
  `${TEST} - add unit or end-to-end tests`,
]
