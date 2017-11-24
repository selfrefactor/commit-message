import { fn } from './'

async function debug(){
  const result = fn('foo')
  console.log(result)
}

debug()