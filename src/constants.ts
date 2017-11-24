import { CommitType } from './typings'
export const ASK_FOR_TYPE = 'What is the type of the commit?'
export const ASK_FOR_LABEL = 'Select label'
export const ASK_FOR_MESSAGE = 'What is the message of the commit?'

export const labels = [
  '',
  'start',
  'end',
  'perf',
  'UI',
  'style',
  'important',
]

export const FEATURE = {
  explanation: 'Significant change in the functionality',
  key: 'FEATURE',
  needsLabel: true,
  value: 'feat',
}

export const TEST = {
  explanation: 'writing unit or end-to-end tests for specific feature',
  key: 'TEST',
  needsLabel: true,
  value: 'test',
}

export const FIX = {
  explanation: 'fixing an issue. Start with: \'broken\', \'missing typing\' ...',
  key: 'FIX',
  needsLabel: true,
  value: 'fix',
}

export const TYPINGS = {
  explanation: 'edit Typescript definitions',
  key: 'TYPINGS',
  needsLabel: false,
  value: 'typing',
}

export const SUPPORT = {
  explanation: 'cleaning tasks, such as remove unnecessary files or linting files.',
  key: 'SUPPORT',
  needsLabel: false,
  value: 'chore',
}

export const REFACTOR = {
  explanation: 'refactor code without affecting functionality',
  key: 'REFACTOR',
  needsLabel: false,
  value: 'refactor',
}

export const DOCS = {
  explanation: 'add to the documentation of the project',
  key: 'DOCS',
  needsLabel: false,
  value: 'docs',
}

export const typesOfCommit: CommitType[] = [
  FEATURE,
  FIX,
  TEST,
  REFACTOR,
  TYPINGS,
  SUPPORT,
  DOCS,
]

export const typesOfCommitKeys: string[] = typesOfCommit.map(x => x.key)

export const explanationOfTypes: string[] = [
  `${FIX.key} - ${FIX.explanation}`,
  `${FEATURE.key} - ${FEATURE.explanation}`,
  `${TEST.key} - ${TEST.explanation}`,
  `${REFACTOR.key} - ${REFACTOR.explanation}`,
  `${TYPINGS.key} - ${TYPINGS.explanation}`,
  `${DOCS.key} - ${DOCS.explanation}`,
  `${SUPPORT.key} - ${SUPPORT.explanation}`,
]
