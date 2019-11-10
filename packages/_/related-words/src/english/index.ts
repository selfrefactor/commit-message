import * as env from 'env-fn'

import axios from 'axios'
import { comparator } from '../_modules/comparator'
import { 
  last, 
  flatten, 
  pluck, 
  head,
  sort, 
  uniq 
} from 'rambdax'
import { debug } from '../_modules/debug';

if(debug()){
  env('special')
}

function getURL(word){
  // [http://developer.wordnik.com/docs.html#!/word/getRelatedWords_get_4](INFO)

  return `http://api.wordnik.com:80/v4/word.json/${word}/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=${process.env.WORDNIK_API}`
}
function getURLx(word){

  return `https://words.bighugelabs.com/api/2/${process.env.BIGHUGELABS_API}/${word}/format=json`
}

export async function englishx(word: string): Promise<string[]>{
  try{
    const URL = getURL(word)
  
    const {data} = await axios.get(URL)
  
    const filtered = data.filter(
      singleSet => 
        singleSet.relationshipType === 'same-context' || 
        singleSet.relationshipType === 'synonym'
    )
  
    if(filtered.length === 0){

      return []
    }

    const similarList: string[] = flatten(pluck<string>('words', filtered))
    
    if(similarList.length === 0){

      return []
    }
  
    return similarList
  }catch(e){
    console.log(e)
    return []
  }
}

export async function englishy(word: string): Promise<string[]>{
  try{
    const URL = getURLx(word)
  
    const {data} = await axios.get(URL)
  
    const splitted = data.trim().split('\n')
    const mapped = splitted.map(x=> last(x.split('|')))
    const filtered = mapped.filter(
      (x:string) => head(x) === head(x).toLowerCase()
    )

    return uniq(filtered)
  }catch(e){
    console.log(e)
    return []
  }
}

export async function english(word: string): Promise<string[]>{
  try {
    const promised = [englishx(word), englishy(word)]
    const result = await Promise.all(promised)
  
    const uniqResult = uniq(flatten<string>(result))  
  
    return sort(
      comparator,
      uniqResult
    )
  } catch (e) {
    console.log(e)
    
    return []    
  }
}

if(debug()){
  english('loser').then(result => {
    console.log(result)
  })
}