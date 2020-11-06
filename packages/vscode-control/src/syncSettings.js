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

const FONT_SIZE = 18
const ZOOM = 0.7
const LINE_HEIGHT = 23
const SCALE_FACTOR = process.env.SCALE === undefined ?
  1 :
  toDecimal(Number(process.env.SCALE))

const KEYBINDING_SOURCE = resolve(__dirname, '../.vscode/keybindings.json')
const SNIPPETS_SOURCE = resolve(__dirname, '../.vscode/snippets.json')

function syncFiles(source, destination){
  copySync(source, destination)
}

const getCalculatedOptions = () => {
  const fontSize = toDecimal(FONT_SIZE * SCALE_FACTOR)
  const zoomLevel = toDecimal(ZOOM * SCALE_FACTOR)
  const lineHeight = Math.round(toDecimal(LINE_HEIGHT * SCALE_FACTOR))
  const suggestFontSize = Math.round(toDecimal(FONT_SIZE * (SCALE_FACTOR + 0.1) ))
  const suggestLineHeight = Math.round(toDecimal(LINE_HEIGHT * (SCALE_FACTOR + 0.1) ))
  const terminalFontSize = Math.round(toDecimal(FONT_SIZE * (SCALE_FACTOR - 0.14) ))

  return  {
    'editor.fontFamily': 'Fantasque Sans Mono',
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
    "editor.minimap.renderCharacters": false,
    "editor.minimap.scale": 2,
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
    'debug.console.fontFamily' :'Operator Mono',
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
