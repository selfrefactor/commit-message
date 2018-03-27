import { getCustomLabels } from './_modules/getCustomLabels'
import { CommitType, Label } from './typings'

import { constantCase } from 'string-fn'

export const ASK_FOR_TYPE = 'What is the type of the commit?'
export const ASK_FOR_LABEL = 'Select label'
export const ASK_FOR_CUSTOM_LABEL = 'Write your label'
export const ASK_FOR_MESSAGE = 'What is the message of the commit?'

export const FEATURE = {
  explanation: '💡  Add new feature to the project',
  key: 'FEATURE',
  value: 'feat',
}

const TEST = {
  explanation: '🔍  Create unit or end-to-end test',
  key: 'TEST',
  value: 'test',
}

const FIX = {
  explanation: '⚒  Submit a bug fix',
  key: 'FIX',
  value: 'fix',
}

const TYPINGS = {
  explanation: '✍️  Edit Typescript definitions',
  key: 'TYPINGS',
  value: 'typings',
}

const SUPPORT = {
  explanation: '☂️  Improve development environment',
  key: 'SUPPORT',
  value: 'chore',
}

const DOCS = {
  explanation: '📚️  Edit the documentation of the project',
  key: 'DOCS',
  value: 'docs',
}

export const typesOfCommit: CommitType[] = [
  FEATURE,
  FIX,
  TEST,
  SUPPORT,
  TYPINGS,
  DOCS,
]

export const explanationOfTypes: string[] = [
  `${FEATURE.key} - ${FEATURE.explanation}`,
  `${FIX.key} - ${FIX.explanation}`,
  `${SUPPORT.key} - ${SUPPORT.explanation}`,
  `${TEST.key} - ${TEST.explanation}`,
  `${TYPINGS.key} - ${TYPINGS.explanation}`,
  `${DOCS.key} - ${DOCS.explanation}`,
]

export const EMPTY_LABEL = {
  belongsTo: typesOfCommit,
  explanation: 'No label',
  value: '',
}

export const CUSTOM_LABEL = {
  belongsTo: typesOfCommit,
  explanation: 'Write your own label',
  value: 'custom_label',
}

const PERFORMANCE_LABEL = {
  belongsTo: [
    FEATURE,
    SUPPORT,
  ],
  explanation: '💪  Improve code performance',
  value: 'perf',
}

const UI_LABEL = {
  belongsTo: [
    FIX,
    FEATURE,
    TEST,
  ],
  explanation: '👁  Frontend related changes',
  value: 'UI',
}

const EXTEND_LABEL = {
  belongsTo: [
    FEATURE,
    SUPPORT,
  ],
  explanation: '🔄  Build upon current behaviour',
  value: 'extend',
}

const STYLE_LABEL = {
  belongsTo: [
    FIX,
    FEATURE,
  ],
  explanation: '💋  CSS/LESS related changes',
  value: 'style',
}

const ISSUE_LABEL = {
  belongsTo: [
    FIX,
  ],
  explanation: '🚮  Close issue',
  value: 'issue',
}

const IMPORTANT_LABEL = {
  belongsTo: [
    FIX,
    FEATURE,
    TEST,
    TYPINGS,
    SUPPORT,
  ],
  explanation: '⚠  Commit with higher significance',
  value: 'important',
}

const SMALL_LABEL = {
  belongsTo: [
    FEATURE,
    TEST,
    TYPINGS,
    DOCS,
    SUPPORT,
  ],
  explanation: '🆗  Small change is made',
  value: 'small',
}

const DEPENDENCY_LABEL = {
  belongsTo: [
    FEATURE,
    FIX,
    SUPPORT,
  ],
  explanation: '📦  Add, remove or update dependencies',
  value: 'dependency',
}

const BREAK_LABEL = {
  belongsTo: [
    FEATURE,
    FIX,
  ],
  explanation: '💣  Introduce breaking changes',
  value: 'break',
}

const EXAMPLES_LABEL = {
  belongsTo: [DOCS],
  explanation: '📝  Add, remove or update examples in documentation',
  value: 'examples',
}

const PUBLISH_LABEL = {
  belongsTo: [SUPPORT],
  explanation: '📨  Publish new version of the code',
  value: 'publish',
}

const TYPO_LABEL = {
  belongsTo: [FIX, DOCS],
  explanation: '🔠  Fix a typo',
  value: 'typo',
}

const USAGE_LABEL = {
  belongsTo: [DOCS],
  explanation: 'ℹ️  Edit usage information',
  value: 'usage',
}

const REMOVE_LABEL = {
  belongsTo: [FEATURE, TEST, DOCS],
  explanation: '🔪  Remove feature or test',
  value: 'cut',
}

export const START_LABEL = {
  belongsTo: [FEATURE, SUPPORT, FIX],
  explanation: '▶️  Begin developing a new feature, bugfix or support script',
  value: 'start',
}

export const PROGRESS_LABEL = {
  belongsTo: [FEATURE, SUPPORT, FIX],
  explanation: '🐌  Continue developing a new feature, bugfix or support script',
  value: 'progress',
}

export const STOP_LABEL = {
  belongsTo: [FEATURE, SUPPORT, FIX],
  explanation: '⏹  Stop developing a new feature, bugfix or support script',
  value: 'stop',
}

const customLabelsRaw = getCustomLabels()
const customLabels: Label[] = []

const getBelongsTo = (key): CommitType[] => {
  let flag = false
  let commitTypeHolder: CommitType

  typesOfCommit.map(singleCommitType => {
    if (singleCommitType.key.toLowerCase() === key) {
      flag = true
      commitTypeHolder = singleCommitType
    }
  })

  return flag ?
    [commitTypeHolder] :
    []
}

if (customLabelsRaw !== false) {
  const belongsToWhenLabel: CommitType[] = [
    FEATURE,
    FIX,
    TEST,
  ]

  Object.keys(customLabelsRaw).map(key => {

    customLabelsRaw[key].map(singleLabel => {

      const belongsToValue = key === 'labels' ?
        belongsToWhenLabel :
        getBelongsTo(key)

      const x: Label = {
        belongsTo: belongsToValue,
        explanation: `🔧  ${constantCase(singleLabel)}`,
        value: singleLabel,
      }

      customLabels.push(x)
    })
  })
}

export const labels: Label[] = [
  EMPTY_LABEL,
  ...customLabels,
  ISSUE_LABEL,
  START_LABEL,
  PROGRESS_LABEL,
  STOP_LABEL,
  STYLE_LABEL,
  UI_LABEL,
  PERFORMANCE_LABEL,
  TYPO_LABEL,
  DEPENDENCY_LABEL,
  PUBLISH_LABEL,
  EXAMPLES_LABEL,
  USAGE_LABEL,
  EXTEND_LABEL,
  IMPORTANT_LABEL,
  BREAK_LABEL,
  SMALL_LABEL,
  REMOVE_LABEL,
  CUSTOM_LABEL,
]
