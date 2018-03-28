import {load} from 'package-storage'

export function getWorkInProgress(): string {
  try{

    return load('commitMessage', 'workInProgress', true) || ''
  }catch (e){
    console.log(e.message)

    return ''
  }
}
