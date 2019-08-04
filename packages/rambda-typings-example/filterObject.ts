import { 
  filter as filterx
 } from 'rambdax'
import { 
  filter
 } from 'rambdax'

const a = filter<number>(
  x => {
    console.log(x)
    return true
  }
  // `c` is string and here is correct warning about the mismatch
)({a:1,b:2, c: 's'}) 

const aa = filterx<number>(
  (x, prop, i) => {
    console.log(x)
    return true
  },
{a:1,b:2}) 