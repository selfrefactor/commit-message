import {
  join,
  map,
  piped,
  split,
} from 'rambdax'

 
export function toFixedLineLength(str, lineLength) {
  return piped(
    str,
    split('\n'),
    map(
      x => {
        if(x.length > lineLength){
          console.warn(`line \`${x}\` is too long`)
          return x
        } 

        return `${ x }${ ' '.repeat(lineLength - x.length) }`
      },
    ),
    join('\n')
  )
  
}