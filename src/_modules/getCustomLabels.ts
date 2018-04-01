import { load } from 'package-storage'

export function getCustomLabels(): false | object {
  try{
    const loaded = load('commitMessage', undefined, true)

    return Object.keys(loaded).length === 0 ?
      false :
      loaded
  }catch(e){
    console.log(e)

    return false
  }
}
