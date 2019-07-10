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
    replace('/Code/', '/Code - Exploration/', x)
   ]
}

function syncFiles(source, list){
  list.forEach(x => {
    copySync(source, x)
  })
}

const splittedOptions = {
  'editor.fontSize'          : [ 18, 20 ],
  // "editor.fontSize": [ 24,28],
  'editor.lineHeight'        : [ 23, 25 ],
  // "editor.lineHeight": [27, 32 ],
  'editor.suggestFontSize'   : [ 22, 22 ],
  'editor.suggestLineHeight' : [ 25, 25 ],
  // 'window.zoomLevel'         : [ 1.5, 1 ],
  'window.zoomLevel'         : [ -0.65, -0.5 ],
  'workbench.colorTheme'     : [ 'ZeppelinLemonSong', 'ZeppelinDancingDays' ],
  'editor.fontFamily'        : [ 'Operator Mono', 'Bar' ],
  'debug.console.fontFamily' : [ 'Operator Mono', 'Bar' ],
  'niketa.PORT_0'            : [ 3011, 3021 ],
  'niketa.PORT_1'            : [ 3012, 3022 ],
  'niketa.PORT_2'            : [ 3013, 3023 ],
  'niketa.PORT_3'            : [ 3014, 3024 ],
}

const getPartialOptions = index => map(
  x => x[ index ]
)(splittedOptions)

function syncSettings(){
  const [ 
    stableSettingsLocation, 
    insidersSettingsLocation,
    explorationSettingsLocation,
   ] = getListFiles(
    SETTINGS
  )

  writeJsonSync(stableSettingsLocation, {
    ...settings,
    ...getPartialOptions(1),
  }, { spaces : 2 })
  writeJsonSync(insidersSettingsLocation, {
    ...settings,
    ...getPartialOptions(0),
  }, { spaces : 2 })
}

function sync(){
  syncFiles(KEYBINDING_SOURCE, getListFiles(KEYBINDING))
  syncFiles(SNIPPETS_SOURCE, getListFiles(JS_SNIPPETS))
  syncFiles(SNIPPETS_SOURCE, getListFiles(JSX_SNIPPETS))
  syncFiles(SNIPPETS_SOURCE, getListFiles(TS_SNIPPETS))
  syncFiles(SNIPPETS_SOURCE, getListFiles(TSX_SNIPPETS))

  syncSettings()
}

sync()
