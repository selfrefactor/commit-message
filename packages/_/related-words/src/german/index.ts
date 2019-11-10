import axios from 'axios'
import { parse } from './parse';
import { debug } from '../_modules/debug';

function getURL(word: string){
  const encoded = encodeURIComponent(word)
  const base = 'https://www.openthesaurus.de/synonyme/search'
  const url = `${base}?q=${encoded}&format=application/json`

  return url
}

export async function german(word: string){
  try{
    const url = getURL(word)
    const result = await axios.get(url)
    
    return parse(word, result.data)
  }catch(e){
    console.log(e)
    
    return []
  }
}


if(debug()){
  german('%C3%BCberzeugt').then(result => {
    console.log(result)
  })
}