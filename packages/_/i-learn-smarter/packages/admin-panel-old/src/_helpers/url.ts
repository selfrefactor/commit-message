type Context = 'DEV' | 'NGROK' | 'PROD'
import { defaultTo } from 'rambdax'

const holder = {}

export function url(label: string, context?: Context){
  const CONTEXT = defaultTo(process.env.CONTEXT, context)
  if (holder[label] === undefined){
    holder[label] = true
    console.log({CONTEXT, label})
  }

  if (CONTEXT === 'DEV'){
    return 'http://localhost:3010'
  }
  if (CONTEXT === 'NGROK'){
    return 'https://toteff.eu.ngrok.io'
  }
  return 'https://ilearnsmarter.com/proxy'
}
