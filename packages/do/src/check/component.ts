import { markerCheck } from './marker'

import { switcher } from 'rambdax'
import { camelCase, constantCase, kebabCase, pascalCase } from 'string-fn'
import {
  ACTIONS_MARKER,
  CONNECT_EPICS_MARKER,
  IMPORT_CONSTANTS_MARKER,
  IMPORT_EPICS_MARKER,
} from '../constants'

function singleCheck(singleComponent: string, file: CheckFile) {
  const marker = `// ${constantCase(singleComponent)}`
  const route = `path='/${kebabCase(singleComponent)}'`
  const wrappedComponent = `${pascalCase(singleComponent)}Wrapped`
  const epic = `${camelCase(singleComponent)}Epic`
  const store = `${camelCase(singleComponent)}Store`

  const markers = switcher<string[]>(file.key)
    .is('typings', [marker])
    .is('constants', [marker])
    .is('rootEpic', [epic])
    .is('combinedReducers', [store])
    .is('indexTsx', [route, wrappedComponent])
    .default([])

  markerCheck({
    location: file.location,
    markers,
  })
}

export function componentCheck(
  singleComponent: string,
  rootFiles: CheckFile[],
  srcDirectory: string,
) {
  const dir = `${srcDirectory}/${singleComponent}`
  const actions = {
    location: `${dir}/actions.ts`,
    markers: [IMPORT_CONSTANTS_MARKER, ACTIONS_MARKER],
  }
  const component = {
    location: `${dir}/component.tsx`,
    markers: [],
  }
  const reducers = {
    location: `${dir}/reducers.ts`,
    markers: [],
  }
  const indexEpic = {
    location: `${dir}/epics/index.ts`,
    markers: [IMPORT_EPICS_MARKER, CONNECT_EPICS_MARKER],
  }

  const files: ComponentFiles = {
    actions,
    component,
    indexEpic,
    reducers,
  }

  Object.values(files).forEach(markerCheck)
  rootFiles.forEach(
    rootFile => singleCheck(singleComponent, rootFile),
  )
}
