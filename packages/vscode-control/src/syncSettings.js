import { resolve } from 'path'
import { copySync, writeJsonSync } from 'fs-extra'
import { replace, map, toDecimal } from 'rambdax'
import settings from '../.vscode/settings.json'
import {
  KEYBINDING,
  SETTINGS,
  JS_SNIPPETS,
  JSX_SNIPPETS,
  TS_SNIPPETS,
  TSX_SNIPPETS,
} from './constants'

const SCALE_FACTOR = process.env.SCALE === undefined ?
  1 :
  Number(process.env.SCALE)

const KEYBINDING_SOURCE = resolve(__dirname, '../.vscode/keybindings.json')
const SNIPPETS_SOURCE = resolve(__dirname, '../.vscode/snippets.json')

function getListFiles(x){
  return [
    x,
    replace('/Code/', '/Code - Insiders/', x),
  ]
}

function syncFiles(source, list){
  list.forEach(x => {
    copySync(source, x)
  })
}

const getScaledOptions = () => {
  const fontSize = toDecimal(22 * SCALE_FACTOR)
  const zoomLevel = toDecimal(2.4 * SCALE_FACTOR)
  const lineHeight = toDecimal(25 * SCALE_FACTOR)
  const suggestFontSize = toDecimal(20 * SCALE_FACTOR)
  const suggestLineHeight = toDecimal(23 * SCALE_FACTOR)
  const terminalFontSize = toDecimal(16 * SCALE_FACTOR)
  const base =  {
    "editor.fontSize": fontSize,
    "window.zoomLevel": zoomLevel,
    "editor.lineHeight": lineHeight,
    "editor.suggestFontSize": suggestFontSize,
    "editor.suggestLineHeight": suggestLineHeight,
    "terminal.integrated.fontSize": terminalFontSize,
  }

  const toReturn =  map(
    x => [x,x] 
  )(base)

  toReturn['editor.fontFamily'] =  SCALE_FACTOR === 1 ?
  [ 'Operator Mono', 'Bar'] :
  [ 'Bar' , 'Bar']
  
  return toReturn
}


const splittedOptions = {
  ...getScaledOptions(),
  'debug.console.fontFamily' : [ 'Bar', 'Bar' ],
  'niketa.PORT_0'            : [ 3011, 3021 ],
  'niketa.PORT_1'            : [ 3012, 3022 ],
  'niketa.PORT_2'            : [ 3013, 3023 ],
  'niketa.PORT_3'            : [ 3014, 3024 ],
}

const getPartialOptions = index =>
  map(x => x[ index ] ? x[ index ] : x[ index - 1 ])(splittedOptions)

function syncSettings(){
  const [
    insidersSettingsLocation,
    stableSettingsLocation,
  ] = getListFiles(SETTINGS)

  writeJsonSync(
    insidersSettingsLocation,
    {
      ...settings,
      ...getPartialOptions(0),
    },
    { spaces : 2 }
  )
  writeJsonSync(
    stableSettingsLocation,
    {
      ...settings,
      ...getPartialOptions(1),
    },
    { spaces : 2 }
  )
}

function syncSnippets(){
  syncFiles(SNIPPETS_SOURCE, getListFiles(JS_SNIPPETS))
  syncFiles(SNIPPETS_SOURCE, getListFiles(JSX_SNIPPETS))
  syncFiles(SNIPPETS_SOURCE, getListFiles(TS_SNIPPETS))
  syncFiles(SNIPPETS_SOURCE, getListFiles(TSX_SNIPPETS))
}

void function sync(){
  console.log('START')
  syncFiles(KEYBINDING_SOURCE, getListFiles(KEYBINDING))
  syncSnippets()
  syncSettings()
  console.log('END')
}()
