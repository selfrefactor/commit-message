import { constantCase, pascalCase } from 'string-fn'

const reactTypesList = [
  'epic',
  'component',
  'async.module',
  'standard.module',
  'javascript.module',
]

const nodeTypesList = [
  'async.module',
  'standard.module',
  'javascript.module',
]

const exportHolder = {
  nodeTypes: {},
  reactTypes: {},
}

const icons = [
  '✔️  ',
  '🔘  ',
  '☑️  ',
  '🔴  ',
  '✅  ',
  '⚙️  ',
]

let iconCounter = -1

const getIcon = () => {
  iconCounter++
  if (iconCounter === icons.length) {
    iconCounter = 0
  }

  return icons[iconCounter]
}

nodeTypesList.forEach(singleType => {
  exportHolder.nodeTypes[singleType] = {
    name: `${getIcon()} ${pascalCase(singleType)}`,
    value: constantCase(singleType),
  }
})

reactTypesList.forEach(singleType => {
  exportHolder.reactTypes[singleType] = {
    name: `${getIcon()} ${pascalCase(singleType)}`,
    value: constantCase(singleType),
  }
})

export const nodeTypes = exportHolder.nodeTypes
export const reactTypes = exportHolder.reactTypes
