import { resolve } from 'path'
import { copySync, writeJsonSync } from 'fs-extra'
import { replace, map } from 'rambdax'
import settings from '../.vscode/settings.json'
import {
  KEYBINDING,
  SETTINGS,
  JS_SNIPPETS,
  JSX_SNIPPETS,
  TS_SNIPPETS,
  TSX_SNIPPETS,
} from './constants'

const KEYBINDING_SOURCE = resolve(__dirname, '../.vscode/keybindings.json')
const SNIPPETS_SOURCE = resolve(__dirname, '../.vscode/snippets.json')

function getListFiles(x){
  return [
    x,
    replace('/Code/', '/Code - Insiders/', x),
    replace('/Code/', '/Code - Exploration/', x),
  ]
}

function syncFiles(source, list){
  console.log({source, list})

  list.forEach(x => {
    copySync(source, x)
  })
}

const splittedOptions = {
  'editor.fontSize'          : [ 18, 19 ],
  'editor.lineHeight'        : [ 23, 24 ],
  'editor.suggestFontSize'   : [ 20, 22 ],
  'editor.suggestLineHeight' : [ 23, 25 ],
  'window.zoomLevel'         : [ 0, 0, 0 ],
  'workbench.colorTheme'     : [ 'BraveHomer', 'BraveHomer' ],
  'editor.fontFamily'        : [ 'Operator Mono', 'Operator Mono', 'Operator Mono' ],
  'debug.console.fontFamily' : [ 'Bar', 'Bar', 'Bar' ],
  'niketa.PORT_0'            : [ 3011, 3021 ],
  'niketa.PORT_1'            : [ 3012, 3022 ],
  'niketa.PORT_2'            : [ 3013, 3023 ],
  'niketa.PORT_3'            : [ 3014, 3024 ],
}

const getPartialOptions = index => map(
  x => x[ index ] ? x[index] : x[index-1]
)(splittedOptions)

function syncSettings(){
  const [
    stableSettingsLocation,
    insidersSettingsLocation,
    explorationSettingsLocation,
  ] = getListFiles(
    SETTINGS
  )

  writeJsonSync(insidersSettingsLocation, {
    ...settings,
    ...getPartialOptions(0),
  }, { spaces : 2 })
  writeJsonSync(stableSettingsLocation, {
    ...settings,
    ...getPartialOptions(1),
  }, { spaces : 2 })
  writeJsonSync(explorationSettingsLocation, {
    ...settings,
    ...getPartialOptions(2),
  }, { spaces : 2 })
}

export function syncSnippets(){
  syncFiles(SNIPPETS_SOURCE, getListFiles(JS_SNIPPETS))
  syncFiles(SNIPPETS_SOURCE, getListFiles(JSX_SNIPPETS))
  syncFiles(SNIPPETS_SOURCE, getListFiles(TS_SNIPPETS))
  syncFiles(SNIPPETS_SOURCE, getListFiles(TSX_SNIPPETS))
}

export function sync(){
  syncFiles(KEYBINDING_SOURCE, getListFiles(KEYBINDING))
  syncSnippets()
  syncSettings()
}
