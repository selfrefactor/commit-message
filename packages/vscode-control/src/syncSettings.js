import { resolve } from 'path'
import { copySync, writeJsonSync } from 'fs-extra'
import { toDecimal } from 'rambdax'
import settings from '../.vscode/settings.json'
import {
  KEYBINDING,
  SETTINGS,
  JS_SNIPPETS,
  TS_SNIPPETS,
} from './constants'

const SCALE_FACTOR = process.env.SCALE === undefined ?
  1 :
  Number(process.env.SCALE)

const ZOOM_SCALE_FACTOR = SCALE_FACTOR === 1 ?
  1 :
  toDecimal(Number(process.env.SCALE) * 0.7)

const KEYBINDING_SOURCE = resolve(__dirname, '../.vscode/keybindings.json')
const SNIPPETS_SOURCE = resolve(__dirname, '../.vscode/snippets.json')

function syncFiles(source, destination){
  copySync(source, destination)
}

const getCalculatedOptions = () => {
  const isBig = SCALE_FACTOR === 1
  const fontSize = toDecimal(24 * SCALE_FACTOR)
  const zoomLevel = toDecimal(2 * ZOOM_SCALE_FACTOR)
  const lineHeight = isBig ? 27 : Math.round(toDecimal(34 * SCALE_FACTOR))
  const suggestFontSize = Math.round(toDecimal(20 * SCALE_FACTOR))
  const suggestLineHeight = Math.round(toDecimal(23 * SCALE_FACTOR))
  const terminalFontSize = toDecimal(17 * SCALE_FACTOR)

  return  {
    'editor.fontFamily': 'Operator Mono',
    "editor.fontSize": fontSize,
    "window.zoomLevel": zoomLevel,
    "editor.lineHeight": lineHeight,
    "editor.suggestFontSize": suggestFontSize,
    "editor.suggestLineHeight": suggestLineHeight,
    "terminal.integrated.fontSize": terminalFontSize,
  }
}

function getMinimapOptions(){
  const whenTrue = {
    "editor.minimap.enabled": true,
    "editor.minimap.maxColumn": 50,
    "editor.minimap.renderCharacters": true,
    "editor.minimap.scale": 3,
    "editor.minimap.side": "left",
    "editor.minimap.size": "fit",
  }
  const whenFalse = {
    "editor.minimap.enabled": false,
  }
  return process.env.MINI_MAP === 'ON' ? whenTrue : whenFalse
}



function syncSettings(){
  const newOptions = {
    ...settings,
    ...getMinimapOptions(),
    ...getCalculatedOptions(),
    "workbench.colorTheme": "Archer",
    'debug.console.fontFamily' :'Bar',
    'niketa.PORT_0'            : 3011,
    'niketa.PORT_1'            : 3012,
  }

  writeJsonSync(
    SETTINGS,
    newOptions,
    { spaces : 2 }
  )
}

function syncSnippets(){
  syncFiles(SNIPPETS_SOURCE, JS_SNIPPETS)
  syncFiles(SNIPPETS_SOURCE, TS_SNIPPETS)
}

void function sync(){
  console.log('START')
  syncFiles(KEYBINDING_SOURCE, KEYBINDING)
  syncSnippets()
  syncSettings()
  console.log('END')
}()
