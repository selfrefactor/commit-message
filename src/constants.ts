import { CommitType } from './typings'

export const ASK_FOR_TYPE = 'What is the type of the commit?'
export const ASK_FOR_LABEL = 'Select label'
export const ASK_FOR_MESSAGE = 'What is the message of the commit?'

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
  value: 'typings',
}

export const SUPPORT = {
  explanation: 'update build tasks, lint files or similar; no production code change.',
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

interface Label {
  explanation: string
  belongsTo: CommitType[]
  value: string
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

const EMPTY_LABEL = {
  belongsTo: typesOfCommit,
  explanation: 'No label',
  value: '',
}

const CUSTOM_LABEL = {
  belongsTo: typesOfCommit,
  explanation: 'Write your own label',
  value: 'custom_label',
}

const PERFORMANCE_LABEL = {
  belongsTo: [
    FEATURE,
    SUPPORT,
  ],
  explanation: 'Improve code performance',
  value: 'perf',
}

const UI_LABEL = {
  belongsTo: [
    FIX,
    FEATURE,
    TEST,
  ],
  explanation: 'Frontend related changes',
  value: 'UI',
}

const STYLE_LABEL = {
  belongsTo: [
    FIX,
    FEATURE,
    TEST,
  ],
  explanation: 'CSS related changes',
  value: 'style',
}

const IMPORTANT_LABEL = {
  belongsTo: [
    FIX,
    FEATURE,
    TEST,
    TYPINGS,
    SUPPORT,
  ],
  explanation: 'Commit has higher significance',
  value: 'important',
}

const SMALL_LABEL = {
  belongsTo: typesOfCommit,
  explanation: 'Small change is made',
  value: 'small',
}

const DEPENDENCY_LABEL = {
  belongsTo: [
    FEATURE,
    FIX,
    SUPPORT,
  ],
  explanation: 'Add, remove or update dependencies',
  value: 'dependency',
}

const CHANGE_LABEL = {
  belongsTo: [FEATURE],
  explanation: 'Changing behaviour of current feature',
  value: 'change',
}

const BREAK_LABEL = {
  belongsTo: [
    FEATURE,
    FIX,
  ],
  explanation: 'Introduce breaking changes',
  value: 'break',
}

const EXAMPLES_LABEL = {
  belongsTo: [DOCS],
  explanation: 'Add, remove or update examples in documentation',
  value: 'examples',
}

const PUBLISH_LABEL = {
  belongsTo: [SUPPORT],
  explanation: 'Publish new version of the code',
  value: 'publish',
}

const TYPO_LABEL = {
  belongsTo: [FIX],
  explanation: 'Fixing typo',
  value: 'typo',
}

export const labels: Label[] = [
  EMPTY_LABEL,
  STYLE_LABEL,
  UI_LABEL,
  PERFORMANCE_LABEL,
  CHANGE_LABEL,
  TYPO_LABEL,
  DEPENDENCY_LABEL,
  PUBLISH_LABEL,
  EXAMPLES_LABEL,
  BREAK_LABEL,
  IMPORTANT_LABEL,
  SMALL_LABEL,
  CUSTOM_LABEL,
]
