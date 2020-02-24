import { setter, getter } from 'rambdax'

export function initBee(dir){
  setter('DIR', dir)
}

export function getDirBee(){
  const found = getter('DIR')

  return found
}
