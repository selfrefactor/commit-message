import { resolve } from 'path'
import { copySync, writeJsonSync, existsSync } from 'fs-extra'
import { replace, map, toDecimal } from 'rambdax'
import settings from '../.vscode/settings.json'
import {
  KEYBINDING,
  SETTINGS,
  JS_SNIPPETS,
  TS_SNIPPETS,
} from './constants'


const OPERATOR_MONO = process.env.OPERATOR_MONO === 'ON'

const SCALE_FACTOR = process.env.SCALE === undefined ?
  1 :
  Number(process.env.SCALE)

const ZOOM_SCALE_FACTOR = SCALE_FACTOR === 1 ?
  1 :
  toDecimal(Number(process.env.SCALE) * 0.7)

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
  const isBig = SCALE_FACTOR === 1
  const fontSize = toDecimal(24 * SCALE_FACTOR)
  const zoomLevel = toDecimal(2 * ZOOM_SCALE_FACTOR)
  const lineHeight = isBig ? 27 : Math.round(toDecimal(34 * SCALE_FACTOR))
  const suggestFontSize = Math.round(toDecimal(20 * SCALE_FACTOR))
  const suggestLineHeight = Math.round(toDecimal(23 * SCALE_FACTOR))
  const terminalFontSize = toDecimal(17 * SCALE_FACTOR)
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

  const fontFamilyInsiders = OPERATOR_MONO ? 'Operator Mono' : 'Bar'

  toReturn['editor.fontFamily'] = SCALE_FACTOR === 1 ?
  [ fontFamilyInsiders, 'Bar'] :
  [ fontFamilyInsiders , 'Bar']

  console.log(toReturn)
  
  return toReturn
}

function getMinimapOptions(){
  const whenTrue = {
    "editor.minimap.enabled": true,
    "editor.minimap.maxColumn": 70,
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


const splittedOptions = {
  ...getScaledOptions(),
  "workbench.colorTheme": [ "AmericanAlien", 'AmericanDad'],
  'debug.console.fontFamily' : [ 'Bar', 'Bar' ],
  'niketa.PORT_0'            : [ 3011, 3021 ],
  'niketa.PORT_1'            : [ 3012, 3022 ],
}

const getPartialOptions = index =>
  map(x => x[ index ] ? x[ index ] : x[ index - 1 ])(splittedOptions)

function syncSettings(){
  const [
    stableSettingsLocation,
    insidersSettingsLocation,
  ] = getListFiles(SETTINGS)

  const mergedSettings = {
    ...settings,
    ...getMinimapOptions()
  }

  writeJsonSync(
    insidersSettingsLocation,
    {
      ...mergedSettings,
      ...getPartialOptions(0),
    },
    { spaces : 2 }
  )
  if(!existsSync(stableSettingsLocation)){
    return console.log('Only Insiders');
  }
  writeJsonSync(
    stableSettingsLocation,
    {
      ...mergedSettings,
      ...getPartialOptions(1),
    },
    { spaces : 2 }
  )
}

function syncSnippets(){
  syncFiles(SNIPPETS_SOURCE, getListFiles(JS_SNIPPETS))
  syncFiles(SNIPPETS_SOURCE, getListFiles(TS_SNIPPETS))
}

void function sync(){
  console.log('START')
  syncFiles(KEYBINDING_SOURCE, getListFiles(KEYBINDING))
  syncSnippets()
  syncSettings()
  console.log('END')
}()
