import {
  ACTION_INTERFACES_MARKER,
  COMPONENTS_MARKER,
  CONNECT_EPICS_MARKER,
  CONNECT_STORES_MARKER,
  CONSTANTS_MARKER,
  IMPORT_EPICS_MARKER,
  IMPORT_STORES_MARKER,
  INJECT_COMPONENT_MARKER,
  ROUTES_MARKER,
} from '../constants'

import { log } from 'helpers'
import { filter } from 'rambdax'
import { constantCase } from 'string-fn'
import { getAllComponents } from '../_helpers/getAllComponents'
import { componentCheck } from './component'
import { markerCheck } from './marker'

export async function check(srcDirectory: string) {
  const allComponentsRaw = await getAllComponents(srcDirectory)
  const allComponents = allComponentsRaw.filter(
    x => x !== 'root' && !x.startsWith('_'),
  )

  const markers = allComponents.map(x => `// ${constantCase(x)}`)
  const combinedReducers = {
    key: 'combinedReducers',
    location: `${srcDirectory}/root/combinedReducers.ts`,
    markers: [IMPORT_STORES_MARKER, CONNECT_STORES_MARKER],
  }
  const constants = {
    key: 'constants',
    location: `${srcDirectory}/constants.ts`,
    markers,
  }
  const indexTsx = {
    key: 'indexTsx',
    location: `${srcDirectory}/index.tsx`,
    markers: [COMPONENTS_MARKER, ROUTES_MARKER],
  }
  const rootEpic = {
    key: 'rootEpic',
    location: `${srcDirectory}/root/epics/index.ts`,
    markers: [
      CONNECT_EPICS_MARKER,
      IMPORT_EPICS_MARKER,
    ],
  }
  const typings = {
    key: 'typings',
    location: `${srcDirectory}/typings.d.ts`,
    markers: [
      ACTION_INTERFACES_MARKER,
      CONSTANTS_MARKER,
      INJECT_COMPONENT_MARKER,
    ],
  }

  const files: CheckFiles = {
    combinedReducers,
    constants,
    indexTsx,
    rootEpic,
    typings,
  }

  const filteredFiles = filter<CheckFile>(
    markerCheck,
    Object.values(files),
  )

  allComponents.forEach(
    singleComponent => componentCheck(
      singleComponent,
      filteredFiles,
      srcDirectory,
    ),
  )

  log('', 'success')
}
